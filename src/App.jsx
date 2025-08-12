import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Loading from "./components/Loading";
import Hero from "./components/Hero";
import MovieModal from "./components/MovieModal";
import { getData, searchData, idOfData } from "../Api/script";
import "./index.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("Action");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch category movies
  useEffect(() => {
    setLoading(true);
    setError(null);
    getData(category)
      .then((res) => setMovies(res?.Search || []))
      .catch((err) => setError(err?.message || "Failed to load movies"))
      .finally(() => setLoading(false));
  }, [category]);

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setQuery("");
  };

  const handleSearch = (q) => {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setError(null);
    searchData(q)
      .then((res) => setMovies(res?.Search || []))
      .catch((err) => setError(err?.message || "Search failed"))
      .finally(() => setLoading(false));
  };

  const openMovie = (imdbID) => {
    if (!imdbID) return;
    setIsModalOpen(true);
    setSelectedMovieDetails(null);
    setDetailsLoading(true);
    setDetailsError(null);

    idOfData(imdbID)
      .then((res) => setSelectedMovieDetails(res || null))
      .catch((err) => setDetailsError(err?.message || "Failed to load details"))
      .finally(() => setDetailsLoading(false));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovieDetails(null);
    setDetailsError(null);
  };

  const heroMovie = movies?.[0];

  return (
    <div className="app-root">
      <Navbar
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
        category={category}
      />

      <main className="container-fluid px-4">
        {heroMovie && (
          <Hero
            title={heroMovie.Title}
            subtitle={`${heroMovie.Year} • ${heroMovie.Type}`}
            backgroundImage={heroMovie.Poster !== "N/A" ? heroMovie.Poster : ""}
          />
        )}

        <section className="mt-4">
          <h4 className="section-title">
            {query
              ? `Search results for "${query}"`
              : `${category} movies`}
          </h4>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : movies.length === 0 ? (
            <div className="no-results">No movies found.</div>
          ) : (
            <div className="movie-grid">
              {movies.map((m) => (
                <Card
                  key={m.imdbID}
                  img={m.Poster}
                  title={m.Title}
                  year={m.Year}
                  description={m.Type}
                  onClick={() => openMovie(m.imdbID)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {isModalOpen && (
        <MovieModal
          isOpen={isModalOpen}
          onClose={closeModal}
          details={selectedMovieDetails}
          loading={detailsLoading}
          error={detailsError}
        />
      )}
    </div>
  );
}

export default App;
