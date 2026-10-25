const KEY = 'movieshelf-favorites';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function isFavorite(id) {
  return getFavorites().some((m) => m.id === id);
}

export function toggleFavorite(movie) {
  const favorites = getFavorites();
  const exists = favorites.some((m) => m.id === movie.id);
  const updated = exists
    ? favorites.filter((m) => m.id !== movie.id)
    : [...favorites, movie];
  localStorage.setItem(KEY, JSON.stringify(updated));
  return !exists;
}