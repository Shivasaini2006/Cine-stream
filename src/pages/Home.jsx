import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useFavorites } from '../hooks/useFavorites';
import MovieGrid from '../components/MovieGrid';
import MoodMatcher from '../components/MoodMatcher';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const { movies, loading, error, hasMore, handleSearch, loadMore } = useFetchMovies();
  const { favorites, toggleFavorite } = useFavorites();
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Sync URL query with fetch
  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  const lastElementRef = useInfiniteScroll(loadMore, hasMore, loading);

  const handleMovieFoundByAI = (title) => {
    setSearchParams({ query: title });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* AI Mood Matcher section */}
      <MoodMatcher onMovieFound={handleMovieFoundByAI} />

      <div className="mb-8 mt-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          {query ? `Search Results for "${query}"` : 'Popular Movies'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <MovieGrid 
        movies={movies} 
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onMovieClick={setSelectedMovie}
      />

      {/* Loading Indicator for Infinite Scroll */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      )}

      {/* Ref for IntersectionObserver */}
      {!loading && hasMore && (
        <div ref={lastElementRef} className="h-10 w-full" />
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

export default Home;
