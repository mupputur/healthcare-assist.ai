import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaBell,
  FaCalendarAlt,
  FaHospital,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaRunning,
  FaTint,
  FaMoon,
  FaArrowRight,
} from "react-icons/fa";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.appointments) {
      // ✅ filter out cancelled appointments
      setAppointments(currentUser.appointments.filter(a => a.status !== "Cancelled"));
    }
  }, []);

  const policies = [
    { id: 1, name: "Health Protect Plus", coverage: "₹5,00,000", premium: "₹5,000", icon: <FaShieldAlt /> },
    { id: 2, name: "Family Care", coverage: "₹3,00,000", premium: "₹3,000", icon: <FaShieldAlt /> },
    { id: 3, name: "Senior Secure", coverage: "₹4,00,000", premium: "₹4,500", icon: <FaShieldAlt /> },
    { id: 4, name: "Wellness Shield", coverage: "₹6,00,000", premium: "₹6,000", icon: <FaShieldAlt /> },
  ];

  const reminders = [
    {
      id: 1,
      title: "Take Blood Pressure Medicine",
      time: "8:00 AM",
      details: "1 tablet after breakfast with a glass of water.",
      img: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    },
    {
      id: 2,
      title: "Doctor Follow-up Visit",
      time: "Tomorrow, 10:30 AM",
      details: "Consultation with Dr. John Smith - Cardiologist.",
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    },
  ];

  const healthTips = [
    "Drink at least 8 glasses of water daily 💧",
    "Walk 10,000 steps a day 🚶‍♂️",
    "Sleep for at least 7 hours 😴",
    "Eat more fresh fruits & vegetables 🥗",
    "Do deep breathing exercises 🌬️",
  ];
  const [tip] = useState(healthTips[Math.floor(Math.random() * healthTips.length)]);

  return (
    <main className={styles.dashboardWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            CarePlus Dashboard
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            Track your health, view appointments & manage your policies easily.
          </motion.p>
        </div>
        <motion.img
          src="https://images.pexels.com/photos/6129052/pexels-photo-6129052.jpeg"
          alt="Healthcare"
          className={styles.heroImage}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      </section>

      {/* Health Tips */}
      <section className={styles.marquee}>
        <div className={styles.marqueeContent}>
          💡 Stay hydrated — 🧘‍♀️ Meditate daily — 🚶‍♂️ Walk 30 mins — 🥗 Eat fresh — 📅 Book checkups regularly!
        </div>
      </section>
       
      

      <section className={styles.tipSection}>
        <h3>💡 Daily Health Tip</h3>
        <p>{tip}</p>
      </section>
        
     <section className={styles.sectionAlt}>
        <h2>📅 My Upcoming Appointments</h2>
        {appointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          appointments.map((a) => (
            <div key={a.id} className={styles.appointmentCard}>
              <p><b>{a.provider.name}</b> ({a.provider.specialty})</p>
              <p>Date: {a.date}, Time: {a.time}</p>
              <p>Type: {a.type}</p>
              <p>Status: {a.status}</p>
            </div>
          ))
        )}
      </section>

      {/* Policies */}
      <section className={styles.section}>
        <motion.img
          src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"
          alt="Health Benefits"
          className={styles.healthBanner}
        />
        <motion.div className={styles.healthIntro}>
          <h2>💖 Comprehensive Health Benefits</h2>
          <p>CarePlus offers a range of health insurance policies tailored for everyone.</p>
        </motion.div>
        <div className={styles.cardGrid}>
          {policies.map((policy) => (
            <motion.div key={policy.id} className={styles.card} whileHover={{ scale: 1.05 }}>
              <div className={styles.cardIcon}>{policy.icon}</div>
              <h3>{policy.name}</h3>
              <p>Coverage: {policy.coverage}</p>
              <p>Premium: {policy.premium}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Show only non-cancelled Appointments */}
      

      {/* Health News */}
      <section className={styles.section}>
        <h2>📰 Latest Health News</h2>
        <div className={styles.newsGrid}>
          <div className={styles.newsCard}>New study shows benefits of daily walking 🚶</div>
          <div className={styles.newsCard}>Green tea linked to better heart health 💚</div>
        </div>
      </section>

      {/* Reminders */}
      <section className={styles.section}>
        <h2>⏰ Care Reminders</h2>
        <div className={styles.reminderGrid}>
          {reminders.map((rem) => (
            <motion.div key={rem.id} className={styles.reminderCard}>
              <img src={rem.img} alt={rem.title} className={styles.reminderImg} />
              <div>
                <h3>{rem.title}</h3>
                <p>{rem.time}</p>
                <p>{rem.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Goals */}
      <section className={styles.sectionAlt}>
        <h2>🏃 Your Health Goals</h2>
        <div className={styles.goals}>
          <p><FaRunning /> Steps: 6,500 / 10,000</p>
          <p><FaTint /> Water: 5 / 8 glasses</p>
          <p><FaMoon /> Sleep: 6 / 8 hrs</p>
        </div>
      </section>

      {/* Emergency & Weather */}
      <section className={styles.section}>
        <div className={styles.emergencyWeather}>
          <div className={styles.emergencyCard}>
            <h3>🚨 Emergency Contact</h3>
            <p>CarePlus Helpline: +91 98765 43210</p>
          </div>
          <div className={styles.weatherCard}>
            <h3>🌤️ Weather</h3>
            <p>Hyderabad: 32°C | Clear</p>
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className={styles.sectionAlt}>
        <h2>💬 Patient Feedback</h2>
        <div className={styles.testimonial}>
          <p>"CarePlus helped me track my medicines easily!" - Ramesh</p>
        </div>
      </section>

      {/* Quick Links */}
      <div className={styles.quickLinks}>
        <button onClick={() => navigate("/appointments")}>Appointments <FaArrowRight /></button>
        <button onClick={() => navigate("/care-reminders")}>Reminders <FaArrowRight /></button>
        <button onClick={() => navigate("/health-benefits")}>Policies <FaArrowRight /></button>
      </div>

      {/* Footer */}
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
