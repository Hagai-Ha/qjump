import React from "react";
import "./FeatureCard.css";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="icon-box">{icon}</div>
      <div className="text-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;