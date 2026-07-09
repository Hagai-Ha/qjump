import "./LoginForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../data/supabaseClient"; 

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      if (authError) {
        console.error("Auth Error:", authError.message); 
        alert("Error Login : " + authError.message);
        setLoading(false);
        return;
      }

    if (authError) {
        // failed - User Name or Password is worng
      alert("User Name or Password is worng");
      setLoading(false);
      return;
    }
    const { data: userData, error: userError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email) 
      .single();

    if (userError || !userData) {
      alert("User not found in the patient system");
    } else {
        const patientId = userData.patientId; 
        navigate(`/patient/${patientId}`);
    }
    
    setLoading(false);
  };

return (
    <form className="login-section" onSubmit={handleLogin}>
      <h3>Log In</h3>
      <input 
        type="email" 
        placeholder="Email" 
        className="login-section__input" 
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="login-section__input" 
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="login-section__button" disabled={loading}>
        {loading ? "Login..." : "Log In with HMO"}
      </button>
      <p className="login-section__hint">Fast & Secure Access via your HMO credentials</p>
    </form>
  );
}

export default LoginForm;