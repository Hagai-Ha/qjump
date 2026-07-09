import React from "react";
import "./HomePage.css";

function Homepage() {
    
  return (

    <div className="homepage">
      <nav className="navbar">
        <div className="logo">Qjump</div>
        <div className="nav-links">
          <span>How it Works</span>
          <span>Clinics</span>
          <span>Resources</span>
          <span>Support</span>
        </div>
      </nav>

      <header className="hero">
        <h1 className="hero__title">
          Qjump: Get Treated Sooner, <br /> 
          reschedule better
        </h1>
        <p className="hero__description">
          Effortlessly manage your appointments. Move forward or postpone with <br />
          confidence, ensuring you and your loved ones get timely care.
        </p>
      </header>

      <section className="login-section">
        <h3>Log In</h3>
        <input 
          type="text" 
          placeholder="HMO ID / Username" 
          className="login-section__input" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="login-section__input" 
        />
        <button className="login-section__button">Log In with HMO</button>
        <p className="login-section__hint">Fast & Secure Access via your HMO credentials</p>
      </section>

      <div className="features-container">
        <div className="feature-card">
          <div className="icon-box">📅</div>
          <div className="text-content">
            <h3>Request Precede</h3>
            <p>Precesl your appointments</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="icon-box">✉️</div>
          <div className="text-content">
            <h3>Request Postpone</h3>
            <p>Postpone with your appointments</p>
          </div>
        </div>
      </div>

      <footer className="footer-legal">
        Legal Information © 2022-2022 - Tenvaos Blods, Inc. All rights reserved.
      </footer>
    </div>
  );
}

export default Homepage;