import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../data/supabaseClient";

function hasPersistedSession() {
  return Object.keys(localStorage).some(
    (key) => key.startsWith("sb-") && key.endsWith("-auth-token")
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(hasPersistedSession);
  const [patientId, setPatientId] = useState(
    () => localStorage.getItem("qjump_patientId")
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function syncSession(session) {
      setIsAuthenticated(!!session);
      if (!session) {
        setPatientId(null);
        localStorage.removeItem("qjump_patientId");
        return;
      }
      const { data: userData } = await supabase
        .from("patients")
        .select("patient_id")
        .eq("user_id", session.user.id)
        .single();
      const id = userData?.patient_id ?? null;
      setPatientId(id);
      if (id) {
        localStorage.setItem("qjump_patientId", id);
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      syncSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      syncSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem("qjump_patientId");
    setIsMenuOpen(false);
    navigate("/");
  }

  const isHome = location.pathname === "/";
  const isPatientPage = /^\/patient\/\d+$/.test(location.pathname);
  const isRequestsPage = /^\/patient\/\d+\/requests$/.test(location.pathname);
  const backButtonActive = !isHome && !(isAuthenticated && isPatientPage);
  const backButtonHref = isAuthenticated ? `/patient/${patientId}` : "/";
  const backButtonLabel = isAuthenticated ? "Back to Dashboard" : "Back to Homepage";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Qjump</Link>
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
        
        {/* My requests button */}
        {isPatientPage && isAuthenticated && patientId && (
        <Link
          to={`/patient/${patientId}/requests`}
          className="back-button"
          onClick={() => setIsMenuOpen(false)}
        >
          My Requests
        </Link>
        )}

        <Link
          to={backButtonHref}
          className={`back-button ${!backButtonActive ? "back-button--hidden" : ""}`}
          tabIndex={backButtonActive ? 0 : -1}
          aria-hidden={!backButtonActive}
          onClick={() => setIsMenuOpen(false)}
        >
          {backButtonLabel}
        </Link>
        <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
        <Link to="/clinics" onClick={() => setIsMenuOpen(false)}>Clinics</Link>
        <Link to="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link>
        <Link to="/support" onClick={() => setIsMenuOpen(false)}>Support</Link>
        {!isHome && isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
