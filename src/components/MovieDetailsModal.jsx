import React from 'react';
import { X, Star, Calendar, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path 
    ? `${IMG_BASE_URL}${movie.backdrop_path}` 
    : '';
  
  const posterUrl = movie.poster_path 
    ? `${POSTER_BASE_URL}${movie.poster_path}` 
    : 'https://placehold.co/500x750/1A1A1A/FFFFFF.png?text=No+Image';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div 
        className="relative bg-surface-1 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Let's split layout: Left poster, Right info */}
        <div className="w-full md:w-1/3 shrink-0 hidden md:block">
          <img 
            src={posterUrl} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col overflow-y-auto">
          {/* Backdrop Header for Mobile or General Visual */}
          <div className="h-48 relative block md:hidden shrink-0">
             <img 
              src={backdropUrl || posterUrl} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-1 to-transparent" />
          </div>

          <div className="p-6 md:p-8 flex-1">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {movie.vote_average?.toFixed(1)} Rating
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {movie.release_date}
              </span>
              <span className="px-2 py-1 text-xs border border-white/20 rounded uppercase">
                {movie.original_language}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Overview
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {movie.overview || "No overview available for this movie."}
            </p>
            
            {/* Additional info like popularity can go here */}
            <div className="mt-auto grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-xs text-text-muted">Popularity</p>
                <p className="font-semibold">{movie.popularity?.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Vote Count</p>
                <p className="font-semibold">{movie.vote_count}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieDetailsModal;
