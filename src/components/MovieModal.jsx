// src/components/MovieModal.jsx
import React from "react";
import "./MovieModal.css";

function MovieModal({ isOpen, onClose, details, loading, error }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {loading && <p>Loading movie details...</p>}
        {error && <p className="error-text">{error}</p>}

        {details && (
          <>
            <h2>{details.Title}</h2>
            {details.Poster && details.Poster !== "N/A" && (
              <img src={details.Poster} alt={details.Title} />
            )}
            <p><strong>Year:</strong> {details.Year}</p>
            <p><strong>Genre:</strong> {details.Genre}</p>
            <p><strong>Plot:</strong> {details.Plot}</p>
            <p><strong>Actors:</strong> {details.Actors}</p>
            <p><strong>IMDB Rating:</strong> {details.imdbRating}</p>
          </>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default MovieModal;
