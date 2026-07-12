import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router";
import { supabase } from "../data/supabaseClient";
function Navbar() {
  const navigate = useNavigate();
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }
  return (
    <nav className="navbar">
      <div className="logo">Qjump</div>
      <div className="nav-links">
        <span>How it Works</span>
        <span>Clinics</span>
        <span>Resources</span>
        <span>Support</span>
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