import { useState } from 'react';
import { isFavorite, toggleFavorite } from '../utils/favorites';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const FALLBACK = 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster';

function MovieCard({ movie, onFavoriteChange }) {
  const [favorited, setFavorited] = useState(isFavorite(movie.id));

  function handleFavorite() {
    const nowFavorited = toggleFavorite(movie);
    setFavorited(nowFavorited);
    if (onFavoriteChange) onFavoriteChange();
  }

  const posterUrl = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : FALLBACK;
  const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {rating}</span>
          <span className="movie-year">{year}</span>
        </div>
        <button className="favorite-button" onClick={handleFavorite}>
          {favorited ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;