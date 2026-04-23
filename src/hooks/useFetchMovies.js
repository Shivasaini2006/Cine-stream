import { useState, useEffect, useCallback } from 'react';
import { getPopularMovies, searchMovies } from '../services/api';

export const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentQuery, setCurrentQuery] = useState('');

  const fetchMovies = useCallback(async (query, pageNum) => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (query) {
        data = await searchMovies(query, pageNum);
      } else {
        data = await getPopularMovies(pageNum);
      }

      setMovies((prevMovies) => {
        // If it's a new query (page 1), replace movies. Otherwise, append.
        if (pageNum === 1) {
          return data.results;
        }
        
        // Remove duplicates just in case TMDB returns same movie on pagination boundaries
        const newMovies = [...prevMovies, ...data.results];
        const uniqueMovies = Array.from(new Map(newMovies.map(item => [item.id, item])).values());
        return uniqueMovies;
      });

      setHasMore(data.page < data.total_pages);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized: Please add your TMDB API Key in the .env file.');
      } else {
        setError(err.message || 'Something went wrong while fetching movies.');
      }
      setHasMore(false); // Stop trying to fetch more if it errors out
    } finally {
      setLoading(false);
    }
  }, []);

  // When query changes, reset everything
  useEffect(() => {
    setCurrentQuery(query => {
      // we don't have query directly here, the component will call handleSearch
    });
  }, []);

  const handleSearch = useCallback((query) => {
    setCurrentQuery(query);
    setPage(1);
    fetchMovies(query, 1);
  }, [fetchMovies]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(currentQuery, nextPage);
    }
  }, [loading, hasMore, page, currentQuery, fetchMovies]);

  // Initial load
  useEffect(() => {
    fetchMovies('', 1);
  }, [fetchMovies]);

  return { movies, loading, error, hasMore, handleSearch, loadMore };
};
