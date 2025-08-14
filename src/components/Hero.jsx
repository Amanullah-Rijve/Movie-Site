import React from "react";
import "./hero.css";

function Hero({ title, subtitle, backgroundImage }) {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage || ""})` }}
    >
      <div className="hero-overlay">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default Hero;
