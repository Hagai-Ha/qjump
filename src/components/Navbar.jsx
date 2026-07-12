import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Qjump</div>
      <button
        className={`nav-toggle ${isMenuOpen ? "nav-toggle--open" : ""}`}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`nav-links ${isMenuOpen ? "nav-links--open" : ""}`}>
        <span>How it Works</span>
        <span>Clinics</span>
        <span>Resources</span>
        <span>Support</span>
      </div>
    </nav>
  );
}

export default Navbar;