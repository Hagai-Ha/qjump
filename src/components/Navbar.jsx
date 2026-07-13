import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../data/supabaseClient";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function syncSession(session) {
      setIsAuthenticated(!!session);
      if (!session) {
        setPatientId(null);
        return;
      }
      const { data: userData } = await supabase
        .from("patients")
        .select("patient_id")
        .eq("user_id", session.user.id)
        .single();
      setPatientId(userData?.patient_id ?? null);
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
    setIsMenuOpen(false);
    navigate("/");
  }

  const isHome = location.pathname === "/";
  const isPatientPage = /^\/patient\/\d+$/.test(location.pathname);
  const isRequestsPage = /^\/patient\/\d+\/requests$/.test(location.pathname);

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

        <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
        <Link to="/clinics" onClick={() => setIsMenuOpen(false)}>Clinics</Link>
        <Link to="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link>
        <Link to="/support" onClick={() => setIsMenuOpen(false)}>Support</Link>
        {!isHome && (
          isAuthenticated ? (
            <>
              {patientId && !isPatientPage && (
                <Link
                  to={`/patient/${patientId}`}
                  className="back-button"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Back to Dashboard
                </Link>
              )}
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/" className="back-button" onClick={() => setIsMenuOpen(false)}>
              Back to Homepage
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
