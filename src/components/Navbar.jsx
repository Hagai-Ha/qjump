import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Qjump</div>
      <div className="nav-links">
        <span>How it Works</span>
        <span>Clinics</span>
        <span>Resources</span>
        <span>Support</span>
      </div>
    </nav>
  );
}

export default Navbar;