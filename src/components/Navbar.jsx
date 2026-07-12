import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom"; 
import { supabase } from "../data/supabaseClient";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }
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
        <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
        <Link to="/clinics" onClick={() => setIsMenuOpen(false)}>Clinics</Link>
        <Link to="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link>
        <Link to="/support" onClick={() => setIsMenuOpen(false)}>Support</Link>
        {/* add a logout button with handle logout functionality */}
        {window.location.pathname !== "/" && (
          <button className="logout-button" onClick={() => {
            handleLogout();
          }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;