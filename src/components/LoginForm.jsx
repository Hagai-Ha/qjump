import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { authStore } from "../stores/AuthStore"; 
import "./LoginForm.css"; 

const LoginForm = observer(() => { 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const patientId = await authStore.login();
    if (patientId) {
      navigate(`/patient/${patientId}`);
    }
  };

  return (
    <form className="login-section" onSubmit={handleLogin}>
      <h3>Log In</h3>
      {authStore.errorMessage && <p style={{ color: "red" }}>{authStore.errorMessage}</p>}
      
      <input 
        type="email" 
        className="login-section__input" 
        onChange={(e) => authStore.setEmail(e.target.value)}
        required
      />
      <input 
        type="password" 
        className="login-section__input" 
        onChange={(e) => authStore.setPassword(e.target.value)}
        required
      />
      <button className="login-section__button" disabled={authStore.loading}>
        {authStore.loading ? "Login..." : "Log In with HMO"}
      </button>
    </form>
  );
});

export default LoginForm;