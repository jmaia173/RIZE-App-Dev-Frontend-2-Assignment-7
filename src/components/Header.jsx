import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/movieService';

function Header({ setSearchResults, setSearchLoading, setSearchError }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults(null);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true);
      setSearchError(null);
      try {
        const results = await searchMovies(query);
        setSearchResults(results);
      } catch (err) {
        setSearchError(err.message);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" onClick={() => setQuery(query.trim())}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;