import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header
            setSearchResults={setSearchResults}
            setSearchLoading={setSearchLoading}
            setSearchError={setSearchError}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchResults={searchResults}
                  searchLoading={searchLoading}
                  searchError={searchError}
                />
              }
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;