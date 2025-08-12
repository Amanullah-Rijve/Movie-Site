import React, { useState } from "react";
import "./navbar.css";

function Navbar({ onCategorySelect, onSearch, category }) {
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    "Hollywood",
    "Action",
    "Bollywood",
    "Korean",
    "Tamil",
    "Bangla",
    "Animation",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
    setSearchTerm("");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <span className="brand-logo">Rj</span> Movie
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Category
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      className={`dropdown-item ${
                        category?.toLowerCase() === cat.toLowerCase()
                          ? "active-cat"
                          : ""
                      }`}
                      onClick={() => onCategorySelect(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
