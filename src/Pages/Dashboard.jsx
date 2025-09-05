// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaShieldAlt,
//   FaUsers,
//   FaUserMd,
//   FaHeartbeat,
//   FaBell,
//   FaCalendarAlt,
//   FaHospital,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaFacebookF,
//   FaTwitter,
//   FaLinkedinIn,
//   FaInstagram,
//   FaRunning,
//   FaTint,
//   FaMoon,
//   FaArrowRight,
// } from "react-icons/fa";
// import styles from "../styles/Dashboard.module.css";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const stats = [
//     { id: 1, label: "Active Policies", value: 3, icon: <FaShieldAlt /> },
//     { id: 2, label: "Appointments", value: 5, icon: <FaCalendarAlt /> },
//     { id: 3, label: "Reminders", value: 4, icon: <FaBell /> },
//     { id: 4, label: "Providers", value: 12, icon: <FaHospital /> },
//   ];

//   const doctors = [
//     {
//       name: "Dr. John Smith",
//       specialty: "Cardiologist",
//       exp: "10 years",
//       img: "https://images.pexels.com/photos/8460041/pexels-photo-8460041.jpeg",
//     },
//     {
//       name: "Dr. Sarah Lee",
//       specialty: "Dermatologist",
//       exp: "8 years",
//       img: "https://images.pexels.com/photos/7580258/pexels-photo-7580258.jpeg",
//     },
//     {
//       name: "Dr. Michael Brown",
//       specialty: "Pediatrician",
//       exp: "12 years",
//       img: "https://images.pexels.com/photos/6129501/pexels-photo-6129501.jpeg",
//     },
//     {
//       name: "Dr. Emily Davis",
//       specialty: "Neurologist",
//       exp: "9 years",
//       img: "https://images.pexels.com/photos/8376234/pexels-photo-8376234.jpeg",
//     },
//   ];

//   const policies = [
//     { id: 1, name: "Health Protect Plus", coverage: "₹5,00,000", premium: "₹5,000", icon: <FaShieldAlt /> },
//     { id: 2, name: "Family Care", coverage: "₹3,00,000", premium: "₹3,000", icon: <FaUsers /> },
//     { id: 3, name: "Senior Secure", coverage: "₹4,00,000", premium: "₹4,500", icon: <FaUserMd /> },
//     { id: 4, name: "Wellness Shield", coverage: "₹6,00,000", premium: "₹6,000", icon: <FaHeartbeat /> },
//   ];

//   const reminders = [
//     {
//       id: 1,
//       title: "Take Blood Pressure Medicine",
//       time: "8:00 AM",
//       details: "1 tablet after breakfast with a glass of water.",
//       img: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
//     },
//     {
//       id: 2,
//       title: "Doctor Follow-up Visit",
//       time: "Tomorrow, 10:30 AM",
//       details: "Consultation with Dr. John Smith - Cardiologist.",
//       img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
//     },
//     {
//       id: 3,
//       title: "Annual Health Check-up",
//       time: "Next Monday, 9:00 AM",
//       details: "Full body check-up including blood test, ECG, and eye test.",
//       img: "https://cdn-icons-png.flaticon.com/512/2966/2966485.png",
//     },
//     {
//       id: 4,
//       title: "Morning Walk",
//       time: "Daily, 6:30 AM",
//       details: "30-minute brisk walk in the park.",
//       img: "https://cdn-icons-png.flaticon.com/512/2966/2966480.png",
//     },
//   ];

//   // 💡 Daily Tip
//   const healthTips = [
//     "Drink at least 8 glasses of water daily 💧",
//     "Walk 10,000 steps a day 🚶‍♂️",
//     "Sleep for at least 7 hours 😴",
//     "Eat more fresh fruits & vegetables 🥗",
//     "Do deep breathing exercises 🌬️",
//   ];
//   const [tip] = useState(healthTips[Math.floor(Math.random() * healthTips.length)]);

//   return (
//     <main className={styles.dashboardWrapper}>
//       {/* HERO */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//             CarePlus Dashboard
//           </motion.h1>
//           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
//             Track your health, book appointments & manage your policies easily.
//           </motion.p>
//           <motion.button className={styles.ctaBtn} whileHover={{ scale: 1.05 }} onClick={() => navigate("/appointments")}>
//             Explore Services
//           </motion.button>
//         </div>
//         <motion.img
//           src="https://images.pexels.com/photos/6129052/pexels-photo-6129052.jpeg"
//           alt="Healthcare"
//           className={styles.heroImage}
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.2 }}
//         />
//       </section>

//       {/* MARQUEE */}
//       <section className={styles.marquee}>
//         <div className={styles.marqueeContent}>
//           💡 Stay hydrated — 🧘‍♀️ Meditate daily — 🚶‍♂️ Walk 30 mins — 🥗 Eat fresh — 📅 Book checkups regularly!
//         </div>
//       </section>

//       {/* NEW FEATURE 1: Daily Tip */}
//       <section className={styles.tipSection}>
//         <h3>💡 Daily Health Tip</h3>
//         <p>{tip}</p>
//       </section>

//       {/* Quick Overview */}
//       <section className={styles.sectionAlt}>
//         <h2>📊 Quick Overview</h2>
//         <div className={styles.statsGrid}>
//           {stats.map((s) => (
//             <motion.div key={s.id} className={styles.statCard} whileHover={{ scale: 1.05 }}>
//               <div className={styles.statIcon}>{s.icon}</div>
//               <h3>{s.value}</h3>
//               <p>{s.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* NEW FEATURE 2: BMI Calculator */}
//       <section className={styles.section}>
//         <h2>⚖️ BMI Calculator</h2>
//         <div className={styles.bmiBox}>
//           <input type="number" placeholder="Weight (kg)" />
//           <input type="number" placeholder="Height (cm)" />
//           <button className={styles.ctaBtnSmall}>Calculate</button>
//         </div>
//       </section>

//       {/* Health Benefits */}
//       <section className={styles.section}>
//         <motion.img
//           src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"
//           alt="Health Benefits"
//           className={styles.healthBanner}
//         />
//         <motion.div className={styles.healthIntro}>
//           <h2>💖 Comprehensive Health Benefits</h2>
//           <p>CarePlus offers a range of health insurance policies tailored for everyone.</p>
//         </motion.div>
//         <div className={styles.cardGrid}>
//           {policies.map((policy) => (
//             <motion.div key={policy.id} className={styles.card} whileHover={{ scale: 1.05 }}>
//               <div className={styles.cardIcon}>{policy.icon}</div>
//               <h3>{policy.name}</h3>
//               <p>Coverage: {policy.coverage}</p>
//               <p>Premium: {policy.premium}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* NEW FEATURE 3: Upcoming Events */}
//       <section className={styles.sectionAlt}>
//         <h2>📅 Upcoming Events</h2>
//         <p>🩺 Free Eye Check-up Camp — Sept 2nd</p>
//         <p>💉 Flu Vaccination Drive — Sept 5th</p>
//       </section>

//       {/* Doctors */}
//       <section className={styles.sectionAlt}>
//         <h2>👩‍⚕️ Book an Appointment</h2>
//         <div className={styles.cardGrid}>
//           {doctors.map((doc, i) => (
//             <motion.div key={i} className={styles.doctorCard} whileHover={{ scale: 1.05 }}>
//               <img src={doc.img} alt={doc.name} />
//               <h3>{doc.name}</h3>
//               <p>{doc.specialty}</p>
//               <p>Experience: {doc.exp}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* NEW FEATURE 4: Health News */}
//       <section className={styles.section}>
//         <h2>📰 Latest Health News</h2>
//         <div className={styles.newsGrid}>
//           <div className={styles.newsCard}>New study shows benefits of daily walking 🚶</div>
//           <div className={styles.newsCard}>Green tea linked to better heart health 💚</div>
//         </div>
//       </section>

//       {/* Care Reminders */}
//       <section className={styles.section}>
//         <h2>⏰ Care Reminders</h2>
//         <div className={styles.reminderGrid}>
//           {reminders.map((rem) => (
//             <motion.div key={rem.id} className={styles.reminderCard}>
//               <img src={rem.img} alt={rem.title} className={styles.reminderImg} />
//               <div>
//                 <h3>{rem.title}</h3>
//                 <p>{rem.time}</p>
//                 <p>{rem.details}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* NEW FEATURE 5 + 8: Step Counter & Health Goals */}
//       <section className={styles.sectionAlt}>
//         <h2>🏃 Your Health Goals</h2>
//         <div className={styles.goals}>
//           <p><FaRunning /> Steps: 6,500 / 10,000</p>
//           <p><FaTint /> Water: 5 / 8 glasses</p>
//           <p><FaMoon /> Sleep: 6 / 8 hrs</p>
//         </div>
//       </section>

//       {/* NEW FEATURE 6 + 7: Emergency + Weather */}
//       <section className={styles.section}>
//         <div className={styles.emergencyWeather}>
//           <div className={styles.emergencyCard}>
//             <h3>🚨 Emergency Contact</h3>
//             <p>CarePlus Helpline: +91 98765 43210</p>
//           </div>
//           <div className={styles.weatherCard}>
//             <h3>🌤️ Weather</h3>
//             <p>Hyderabad: 32°C | Clear</p>
//           </div>
//         </div>
//       </section>

//       {/* NEW FEATURE 9: Testimonials */}
//       <section className={styles.sectionAlt}>
//         <h2>💬 Patient Feedback</h2>
//         <div className={styles.testimonial}>
//           <p>"CarePlus helped me track my medicines easily!" - Ramesh</p>
//         </div>
//       </section>

//       {/* NEW FEATURE 10: Quick Links */}
//       <div className={styles.quickLinks}>
//         <button onClick={() => navigate("/appointments")}>Appointments <FaArrowRight /></button>
//         <button onClick={() => navigate("/care-reminders")}>Reminders <FaArrowRight /></button>
//         <button onClick={() => navigate("/health-benefits")}>Policies <FaArrowRight /></button>
//       </div>

//       {/* Footer */}
//       <footer className={styles.footer}>
//         <div>
//           <h2>CarePlus</h2>
//           <p>Your trusted health companion</p>
//           <div className={styles.social}>
//             <a href="#"><FaFacebookF /></a>
//             <a href="#"><FaTwitter /></a>
//             <a href="#"><FaLinkedinIn /></a>
//             <a href="#"><FaInstagram /></a>
//           </div>
//         </div>
//         <div>
//           <h4>Contact</h4>
//           <p><FaMapMarkerAlt /> Hyderabad, India</p>
//           <p><FaPhone /> +91 98765 43210</p>
//           <p><FaEnvelope /> support@careplus.com</p>
//         </div>
//       </footer>
//     </main>
//   );
// }



// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OldUserDashboard from "./OldUserdashboard";
import NewUserDashboard from "./Newuserdashboard";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      // No user found → redirect to login
      navigate("/login");
      return;
    }

    // Ensure appointments always exists
    if (!Array.isArray(user.appointments)) {
      user.appointments = [];
    }

    setCurrentUser(user);
  }, [navigate]);

  if (!currentUser) {
    return <div style={{ padding: 24 }}>Loading dashboard…</div>;
  }

  return (
    <div>
      {/* ✅ Top bar with user info + logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 12,
          borderBottom: "1px solid #eee",
        }}
      >
        <div>
          <strong>Logged in as:</strong> {currentUser.name} —{" "}
          <small>{currentUser.email}</small>
        </div>
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Conditional UI */}
      {currentUser.appointments.length > 0 ? (
        <OldUserDashboard user={currentUser} />
      ) : (
        <NewUserDashboard user={currentUser} />
      )}
    </div>
  );
}
