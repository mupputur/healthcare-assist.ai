import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import bannerImg from "../assets/banner1.jpg";
import docImg1 from "../assets/doctor1.jpg"; 
import docImg2 from "../assets/pharmacy.jpg";
import healthAssistLogo from "../assets/Healthassit-removebg-preview.png"; // ✅ Added logo import

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      ".animate-left, .animate-right, .animate-right-rotate"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="logo">
          <img src={healthAssistLogo} alt="Health Assist Logo" className="logo-img" /> {/* ✅ Updated */}
        
        </div>

        <nav className="nav-links">
          <Link to="/about" className="nav-link">
            About
          </Link>
          <input type="search" placeholder="Search..." className="search-input" />
        </nav>

        <div className="auth-buttons">
          <button onClick={handleLogin} className="btn login-btn">
            Login
          </button>
          <button onClick={handleSignUp} className="btn signup-btn">
            Sign Up
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="home-body">
        <div className="banner-container">
          <img src={bannerImg} alt="Banner" className="banner-image animate-left" />

          {/* Overlay card on left side of banner image */}
          <div className="banner-overlay-card animate-right-rotate">
            <h2>Find a doctor, dentist or hospital</h2>
            <p>
              We’re bringing together trusted care for you. You get one of the largest nationwide
              networks of doctors, hospitals and walk-in clinics — plus the convenience of
              MinuteClinic® locations.
            </p>
          </div>
        </div>

        {/* Content sections */}
        <section className="content-section normal-layout">
          <div className="content-text animate-right">
            <h2>Helping you find doctors with a proven track record</h2>
            <p>
              Finding the right doctor matters. We've done the work for you.
              Aetna Smart Compare® is a designation we give to doctors in our network.
              These doctors have proven time and time again that they provide high-quality,
              effective care. You'll find these doctors with the label “Quality Care,”
              “Effective Care” or both in your search.
            </p>
          </div>
          <div className="content-image animate-left">
            <img src={docImg1} alt="Doctor consulting patient" />
          </div>
        </section>

        <section className="content-section reversed-layout">
          <div className="content-text animate-left">
            <h3>Your choice of providers</h3>
            <h2>Flexible and convenient care options</h2>
            <p>
              Of course, you can use our search tools to find doctors and hospitals that take your insurance.
              You can also find a range of health care providers to help you care for the whole you.
            </p>
            <p>
              Locate vision care providers, and more.
              Care for your unique needs, in one place.
            </p>
          </div>
          <div className="content-image animate-right">
            <img src={docImg2} alt="Doctor speaking with patient" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-links">
          <Link to="/about" className="footer-link">
            About
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
          <Link to="/login" className="footer-link">
            Login
          </Link>
          <Link to="/signup" className="footer-link">
            Sign Up
          </Link>
        </div>
        <div className="social-links">
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            Google
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
