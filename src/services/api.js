import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
});

// Intercept requests to route them through allorigins proxy to bypass ISP blocks
tmdbApi.interceptors.request.use((config) => {
  // Construct the original TMDB URL
  const originalUrl = new URL(config.baseURL + config.url);
  
  // Append api_key and any other params
  originalUrl.searchParams.append('api_key', TMDB_API_KEY);
  if (config.params) {
    Object.keys(config.params).forEach(key => {
      originalUrl.searchParams.append(key, config.params[key]);
    });
  }

  // Set the new proxy URL
  config.baseURL = '';
  config.url = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl.toString())}`;
  
  // Clear the params so axios doesn't append them again unencoded
  config.params = {};

  return config;
});

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/popular`, {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get(`/search/movie`, {
    params: { query, page },
  });
  return response.data;
};

// Placeholder for Gemini API
export const getGeminiMoodMatch = async (moodQuery) => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key is not configured.');
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a movie recommendation assistant. Given a user's mood or prompt, recommend EXACTLY ONE movie title that best matches it. DO NOT say anything else. Just the movie title. The mood is: "${moodQuery}"`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY
        }
      }
    );
    
    const suggestedTitle = response.data.candidates[0].content.parts[0].text.trim();
    // Return only the title text
    return suggestedTitle;
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    throw error;
  }
};
