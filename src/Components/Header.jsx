import React from "react";
import { Link, useNavigate } from "react-router-dom";
import healthAssistLogo from "../assets/Healthassit-removebg-preview.png"; // adjust path as needed
 import "./Header.css"; 

const Header = ({ showAuthButtons = true }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <header className="home-header">
      <div className="logo">
        <img src={healthAssistLogo} alt="Health Assist Logo" className="logo-img" />
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <input type="search" placeholder="Search..." className="search-input" />
      </nav>

      {showAuthButtons && (
        <div className="auth-buttons">
          <button onClick={handleLogin} className="btn login-btn">Login</button>
          <button onClick={handleSignUp} className="btn signup-btn">Sign Up</button>
        </div>
      )}
    </header>
  );
};

export default Header;
