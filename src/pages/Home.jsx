import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults, searchLoading, searchError }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  const isSearching = searchResults !== null;
  const displayedMovies = isSearching ? searchResults : movies;
  const isLoading = isSearching || searchLoading ? searchLoading : loading;
  const currentError = searchError || error;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{isSearching ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : currentError ? (
        <ErrorMessage message={currentError} />
      ) : displayedMovies.length === 0 ? (
        <div className="empty-state">
          <p>No movies found.</p>
        </div>
      ) : (
        <MovieGrid movies={displayedMovies} />
      )}
    </main>
  );
}

export default Home;