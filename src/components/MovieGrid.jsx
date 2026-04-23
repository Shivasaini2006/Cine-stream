import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, favorites, toggleFavorite, onMovieClick }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-text-muted">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={`movie-${movie.id}`}
          movie={movie}
          isFavorite={favorites.some(fav => fav.id === movie.id)}
          onToggleFavorite={toggleFavorite}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
