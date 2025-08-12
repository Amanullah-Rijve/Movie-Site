import React from "react";
import "./card.css";

function Card({ img, title, year, description, onClick }) {
  const poster =
    img && img !== "N/A"
      ? img
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="poster-wrapper">
        <img src={poster} alt={title} />
      </div>
      <div className="movie-info">
        <h6 className="movie-title">{title}</h6>
        <p className="movie-year">{year}</p>
        <p className="movie-type">{description}</p>
      </div>
    </div>
  );
}

export default Card;
