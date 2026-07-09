import React from "react";
import "./LoginForm.css";
function LoginForm() {
  return (
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
  );
}

export default LoginForm;