import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import doctorsData from "../data/doctore.json"; // 👈 Import JSON
import "./NewUserDashboard.css";

export default function NewUserDashboard({ user }) {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const marqueeTips = [
    "💧 Stay hydrated — Drink 2L water daily",
    "🚶 Walk 30 minutes daily",
    "🛌 Sleep at least 7 hrs",
    "🩺 Book your annual check-up",
    "🥦 Eat 5 servings of fruits & veggies",
  ];

  // load doctors from JSON file
  const doctors = doctorsData;

  useEffect(() => {
    const storedAppts = localStorage.getItem("appts_v1");
    const storedTheme = localStorage.getItem("theme_v1");
    if (storedAppts) setAppointments(JSON.parse(storedAppts));
    if (storedTheme) setDarkMode(storedTheme === "dark");
    setNotifications([
      { id: 1, text: "Your lab results are ready.", read: false },
      { id: 2, text: "Dr. Michael Brown is available today.", read: false },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("appts_v1", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("theme_v1", darkMode ? "dark" : "light");
    if (darkMode) document.documentElement.classList.add("dark-mode-root");
    else document.documentElement.classList.remove("dark-mode-root");
  }, [darkMode]);

  const openModal = (doctor = null) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newAppointment = {
      doctor: selectedDoctor || doctors.find((d) => d.name === form.get("doctor")),
      patient: form.get("patient"),
      date: form.get("date"),
      time: form.get("time"),
      id: Date.now(),
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `Appointment confirmed with ${newAppointment.doctor.name}`,
        read: false,
      },
      ...prev,
    ]);
    closeModal();
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={`dashboard enhanced ${darkMode ? "dark" : ""}`}>
      {/* floating bubbles */}
      <div className="bubbles" aria-hidden="true">
        <div className="bubble b1" />
        <div className="bubble b2" />
        <div className="bubble b3" />
        <div className="bubble b4" />
        <div className="bubble b5" />
      </div>

      {/* header */}
      <div className="top-strip">
        <div className="welcome-left">
          <h1>👋 Welcome, {user?.name || "Guest"}!</h1>
          <p className="subtitle">
            We’re excited to help you manage your health journey 🚀
          </p>
        </div>
        <div className="top-actions">
          <button className="primary-btn" onClick={() => openModal()}>
            📅 Book First Appointment
          </button>
          <button className="secondary-btn" onClick={() => navigate("/health-benefits")}>
            📖 Explore Policies
          </button>
          <button className="secondary-btn" onClick={() => setDarkMode((d) => !d)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>

      {/* marquee */}
      <div className="marquee-wrap">
        <div className="marquee">
          <div className="marquee-track">
            {marqueeTips.concat(marqueeTips).map((tip, idx) => (
              <span className="marquee-item" key={idx}>
                {tip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="content-grid two-column">
        {/* left column: doctors */}
        <motion.section
          className="card appointment-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h3>🩺 Book an Appointment</h3>
            <input
              type="text"
              placeholder="🔍 Search by name or specialty..."
              className="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="doctor-list">
            {filteredDoctors.map((doc, i) => (
              <motion.div
                key={i}
                className="doctor-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="doctor-image-container">
                  <img src={doc.image} alt={doc.name} />
                </div>
                <h4>{doc.name}</h4>
                <p className="muted">{doc.specialty}</p>
                <span className="muted">Experience: {doc.experience}</span>
                <button className="book-btn" onClick={() => openModal(doc)}>
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* policies */}
          <div className="policies-section">
            <h3>📖 Appointment Policies</h3>
            <ul>
              <li>✅ Please arrive 15 minutes before your appointment.</li>
              <li>✅ Carry previous medical records & prescriptions.</li>
              <li>✅ Cancellations must be done at least 24 hours prior.</li>
              <li>✅ Follow COVID-19 safety & hygiene protocols.</li>
              <li>✅ Emergency cases may be prioritized over scheduled slots.</li>
            </ul>
          </div>
        </motion.section>

        {/* right column */}
        <motion.aside
          className="illustration-side"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966487.png"
            alt="Appointment Illustration"
          />
        </motion.aside>
      </div>

      {/* booking modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
            >
              <h2>📅 Book Appointment</h2>
              <form className="appointment-form" onSubmit={handleSubmit}>
                {!selectedDoctor ? (
                  <label>
                    Select Doctor:
                    <select name="doctor" required>
                      <option value="">-- Choose a Doctor --</option>
                      {doctors.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.specialty})
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <div className="selected-doctor">
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} />
                    <div>
                      <strong>{selectedDoctor.name}</strong>
                      <div>{selectedDoctor.specialty}</div>
                    </div>
                  </div>
                )}
                <input name="patient" type="text" placeholder="Your Name" required />
                <input name="date" type="date" required />
                <input name="time" type="time" required />
                <div className="modal-actions">
                  <button type="submit" className="primary-btn">Confirm</button>
                  <button type="button" className="secondary-btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3>HealthCare+ App</h3>
            <p>
              Your trusted partner in booking doctor appointments, tracking your
              health, and staying informed. Together, let’s build a healthier tomorrow.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/dashboard">🏠 Home</a></li>
              <li><a href="/appointments">📅 Appointments</a></li>
              <li><a href="/health-benefits">📖 Policies</a></li>
              <li><a href="/profile">👤 My Profile</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer">💬 WhatsApp</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">📘 Facebook</a>
              <a href="https://t.me" target="_blank" rel="noreferrer">✈️ Telegram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">💼 LinkedIn</a>
            </div>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>📍 Hyderabad, India</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@healthapp.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} HealthCare+ App. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}