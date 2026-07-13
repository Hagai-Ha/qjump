import React from "react";
import Hero from "../components/Hero";
import LoginForm from "../components/LoginForm";
import FeatureCard from "../components/FeatureCard";
import "./HomePage.css";

function Homepage() {
  return (
    <div className="homepage">
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
    </div>
  );
}

export default Homepage;
