import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = window.localStorage.getItem('cine_favorites');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('cine_favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isFavorited = prevFavorites.some(fav => fav.id === movie.id);
      if (isFavorited) {
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  return { favorites, toggleFavorite, isFavorite };
};
