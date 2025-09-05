import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../assets/Healthassit-removebg-preview.png";
import { FaBell, FaSun, FaMoon } from "react-icons/fa";
import { NotificationContext } from "../context/NotificationContext";

const Header = () => {
  const location = useLocation();
  const { notifications } = useContext(NotificationContext);

  // 🔢 Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/health-benefits", label: "Health Benefits" },
    { to: "/appointments", label: "Appointments" },
    { to: "/care-reminders", label: "Care Reminders" },
    { to: "/notifications", label: "Notifications" },
    { to: "/login", label: "Logout" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
        <h1 className={styles.title}>CarePlus</h1>
      </div>

      <nav className={styles.nav}>
        <ul>
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`${styles.navLink} ${
                  location.pathname === to ? styles.active : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* 🔔 Bell with Badge */}
          <li className={styles.iconButton}>
            <Link to="/notifications" className={styles.bellWrap}>
              <FaBell />
              {unreadCount > 0 && (
                <span className={styles.badge}>{unreadCount}</span>
              )}
            </Link>
          </li>

          {/* 🌗 Theme Toggle */}
          <li className={styles.iconButton} onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
