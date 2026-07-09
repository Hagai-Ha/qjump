import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LoginForm from "../components/LoginForm";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import "./HomePage.css";

function Homepage() {

    
  return (
    <div className="homepage">
      <Navbar />
      
      <Hero />
      
      <LoginForm />

      <div className="features-container">
        <FeatureCard 
          icon="📅" 
          title="Request Precede" 
          description="Precede your appointments" 
        />
        <FeatureCard 
          icon="✉️" 
          title="Request Postpone" 
          description="Postpone your appointments" 
        />
      </div>

      <Footer />
    </div>
  );
}

export default Homepage;