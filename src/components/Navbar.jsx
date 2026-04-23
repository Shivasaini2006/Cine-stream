import React, { useState, useEffect } from 'react';
import { Search, Film, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

import logoSrc from '../assets/logo.png';

const Navbar = ({ onSearch }) => {
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('query') || '');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    // Sync the debounced search with the URL parameters
    if (debouncedSearch) {
        navigate(`/?query=${encodeURIComponent(debouncedSearch)}`);
    } else if (location.pathname === '/' && searchParams.has('query')) {
        // If search is cleared while on home, clear URL query
        navigate(`/`);
    }
  }, [debouncedSearch, navigate, location.pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When location changes we might want to clear search if they go to favorites, 
  // but let's keep it simple for now.

  return (
    <nav 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-xl' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img 
              src={logoSrc} 
              alt="Cine Stream Logo" 
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform" 
            />
          </Link>

          {/* Search Bar - Visible on all screens now */}
          <div className="flex-1 mx-2 md:mx-8 lg:max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 md:pl-10 pr-3 py-2 border border-white/20 rounded-full bg-surface-2 text-white placeholder-gray-400 text-sm md:text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-white ${
                location.pathname === '/' ? 'text-white' : 'text-gray-400'
              }`}
            >
              <span className="hidden sm:inline">Home</span>
              <Film className="w-5 h-5 sm:hidden" />
            </Link>
            <Link 
              to="/favorites" 
              className={`text-sm font-medium transition-colors hover:text-white flex items-center gap-1 ${
                location.pathname === '/favorites' ? 'text-white' : 'text-gray-400'
              }`}
            >
              <Heart className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Favorites</span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
