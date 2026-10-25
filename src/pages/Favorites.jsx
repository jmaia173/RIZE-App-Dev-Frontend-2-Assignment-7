import { useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getFavorites } from '../utils/favorites';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState(getFavorites());

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {favoriteMovies.length > 0 ? (
        <MovieGrid
          movies={favoriteMovies}
          onFavoriteChange={() => setFavoriteMovies(getFavorites())}
        />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
}

export default Favorites;