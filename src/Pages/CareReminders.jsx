import React, { useState, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";
import "./CareReminders.css"; // 👈 CSS file

const CareReminders = () => {
  const { addNotification } = useNotifications();

  const [appointments, setAppointments] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [editingReminder, setEditingReminder] = useState(null); // ✅ track edit

  // Load appointments + reminders
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.appointments) {
      const confirmed = currentUser.appointments.filter(
        (a) => a.status === "Confirmed"
      );
      setAppointments(confirmed);
    }

    const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(savedReminders);
  }, []);

  // Save reminders
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Schedule reminder
  const scheduleReminder = (reminder) => {
    const reminderDateTime = new Date(reminder.reminderAt);
    const now = new Date();
    const delay = reminderDateTime.getTime() - now.getTime();

    if (delay > 0) {
      setTimeout(() => {
        addNotification(`⏰ Reminder: ${reminder.title} at ${reminder.appointmentTime}`);
        alert(`⏰ Reminder: ${reminder.title} at ${reminder.appointmentTime}`);

        setReminders((prev) =>
          prev.map((rem) =>
            rem.id === reminder.id ? { ...rem, notified: true } : rem
          )
        );
      }, delay);
    }
  };

  useEffect(() => {
    reminders.filter((r) => !r.notified).forEach(scheduleReminder);
    // eslint-disable-next-line
  }, [reminders]);

  // Add new or update reminder
  const handleSaveReminder = () => {
    if (!selectedAppt || !reminderTime) {
      alert("⚠️ Select appointment & time");
      return;
    }

    const appt = appointments.find((a) => String(a.id) === String(selectedAppt));
    if (!appt) {
      alert("⚠️ Appointment not found.");
      return;
    }

    if (editingReminder) {
      // ✅ Update
      const updated = reminders.map((r) =>
        r.id === editingReminder.id
          ? { ...r, reminderAt: reminderTime, notified: false }
          : r
      );
      setReminders(updated);
      setEditingReminder(null);
    } else {
      // ✅ Add new
      const newReminder = {
        id: Date.now(),
        title: `Reminder for ${appt.provider.name}`,
        appointmentTime: `${appt.date} ${appt.time}`,
        reminderAt: reminderTime,
        notified: false,
      };
      setReminders((prev) => [...prev, newReminder]);
      scheduleReminder(newReminder);
    }

    setSelectedAppt("");
    setReminderTime("");
  };

  // Delete reminder
  const deleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  // Edit reminder
  const editReminder = (reminder) => {
    setEditingReminder(reminder);
    setSelectedAppt(appointments.find((a) => `${a.provider.name}` === reminder.title.split("Reminder for ")[1])?.id || "");
    setReminderTime(reminder.reminderAt);
  };

  return (
    <div>
    <div className="care-container">
      <h1>Care Reminders</h1>

      {/* Form */}
      <div className="reminder-form">
        <select
          value={selectedAppt}
          onChange={(e) => setSelectedAppt(e.target.value)}
        >
          <option value="">-- Select Appointment --</option>
          {appointments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.provider.name} on {a.date} at {a.time}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />

        <button onClick={handleSaveReminder}>
          {editingReminder ? "Update Reminder" : "Add Reminder"}
        </button>
      </div>

      {/* List */}
      <h3>Upcoming Reminders</h3>
      {reminders.length === 0 ? (
        <p>No reminders set.</p>
      ) : (
        <ul className="reminder-list">
          {reminders.map((r) => (
            <li key={r.id} className="reminder-item">
              <div>
                <strong>{r.title}</strong> →{" "}
                {new Date(r.reminderAt).toLocaleString()}
                {r.notified && <span className="done"> ✅ (Notified)</span>}
              </div>
              <div className="actions">
                <button onClick={() => editReminder(r)}>✏️ Edit</button>
                <button onClick={() => deleteReminder(r)}>🗑️ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
       
    </div>
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
    </div>
  );
};

export default CareReminders;
