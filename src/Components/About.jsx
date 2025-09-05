import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./About.css";
import bannerImg from "../assets/aboutus.jpg";
import healthAssistLogo from "../assets/Healthassit-removebg-preview.png"; 


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
          <img src={healthAssistLogo} alt="Health Assist Logo" className="logo-img" />

        </div>


        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          {/* <Link to="/contact" className="nav-link">
            Contact
          </Link> */}
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
            <h2>Our history is all about you</h2>
            <p>
              We’re always working to push health care forward as a true partner.
              As part of CVS Health®, we’re building on this legacy to help people
              achieve their personal health goals in new and unique ways
            </p>
          </div>
        </div>


        <section className="goals-section">
          <h2 className="goals-title">Our bold goals for the future</h2>
          <div className="goals-container">
            <div className="goal-card">
              <img src="https://www.aetna.com/content/dam/aetna/asset-libraries/pictograms_2021/Pictogram_onF5_Network_of_health_professionals.svg" alt="Unlock our shared value" className="goal-icon" />
              <h3>Unlock our shared value</h3>
              <p>
                We’ll tap into the breadth of CVS Health resources in new ways to create
                a first-of-its-kind experience.
              </p>
            </div>
            <div className="goal-card">
              <img src="https://www.aetna.com/content/dam/aetna/asset-libraries/pictograms_2021/Pictogram_onF5_Nationwide_locations.svg" alt="Grow our local presence" className="goal-icon" />
              <h3>Grow our local presence</h3>
              <p>
                We’ll continue to expand our national reach and remain rooted in the
                local communities.
              </p>
            </div>
            <div className="goal-card">
              <img src="https://www.aetna.com/content/dam/aetna/asset-libraries/pictograms_2021/Pictogram_onF5_Group-of-people.svg" alt="Keep consumers first" className="goal-icon" />
              <h3>Keep consumers first</h3>
              <p>
                We’ll deliver the most consumer-friendly, holistic, and connected care
                experience possible.
              </p>
            </div>
          </div>
        </section>
        {/* Content sections */}
        <section className="content-section1 ">
          <div className="header">
            <h1>Healthier happens together®</h1>
          </div>
          <div className="content-section2">
            <p>
              As a part of CVS Health, we’re committed to doing more for you and every person we serve.
              With expert care. Extra support. A simple experience. That’s just the beginning.
            </p>
          </div>
        </section>


      </main>


      <footer className="home-footer">
        <div className="footer-links">
          <Link to="/about" className="footer-link">
            About
          </Link>
          {/* <Link to="/contact" className="footer-link">
            Contact
          </Link> */}
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
