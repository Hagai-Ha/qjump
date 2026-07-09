// src/components/Hero.jsx
import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <header className="hero">
      <h1 className="hero__title">
        Qjump: Get Treated Sooner, <br /> 
        reschedule better
      </h1>
      <p className="hero__description">
        Effortlessly manage your appointments. Move forward or postpone with <br />
        confidence, ensuring you and your loved ones get timely care.
      </p>
    </header>
  );
}

export default Hero;