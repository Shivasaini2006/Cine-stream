import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG = 'https://placehold.co/500x750/1A1A1A/FFFFFF.png?text=No+Image';

const MovieCard = ({ movie, isFavorite, onToggleFavorite, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { title, poster_path, release_date, vote_average, id } = movie;
  const releaseYear = release_date ? release_date.substring(0, 4) : 'N/A';
  const posterUrl = poster_path ? `${IMG_BASE_URL}${poster_path}` : PLACEHOLDER_IMG;
  const formattedRating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden bg-surface-2 cursor-pointer group shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
    >
      {/* Poster Image */}
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-[400px] object-cover"
        loading="lazy"
      />

      {/* Favorite Button Overlay */}
      <button
        className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-20"
        onClick={(e) => {
          e.stopPropagation(); // prevent modal open
          onToggleFavorite(movie);
        }}
        aria-label="Toggle Favorite"
      >
        <Heart
          className={`w-5 h-5 ${isFavorite ? 'fill-accent text-accent' : 'text-white'}`}
        />
      </button>

      {/* Persistent Info (Bottom) */}
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <h3 className="text-white font-semibold flex-1 truncate text-lg">
          {title}
        </h3>
        <div className="flex justify-between items-center text-sm text-text-muted mt-1">
          <span>{releaseYear}</span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {formattedRating}
          </span>
        </div>
      </div>

      {/* Hover Info Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-6 text-center z-10"
          >
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-text-muted line-clamp-4">
              {movie.overview || "No overview available."}
            </p>
            <div className="mt-4 px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors">
              View Details
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MovieCard;
