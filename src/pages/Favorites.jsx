import React, { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import MovieGrid from '../components/MovieGrid';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
      <div className="flex items-center gap-3 mb-8 mt-4">
        <Heart className="w-8 h-8 text-accent fill-accent" />
        <h1 className="text-3xl md:text-4xl font-bold">Your Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart className="w-16 h-16 text-white/10 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-text-muted mb-6">
            Find some movies you like and tap the heart icon to save them here.
          </p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            Discover Movies
          </Link>
        </div>
      ) : (
        <MovieGrid 
          movies={favorites} 
          favorites={favorites} 
          toggleFavorite={toggleFavorite} 
          onMovieClick={setSelectedMovie}
        />
      )}

      {/* Selected Movie Modal */}
      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default Favorites;
