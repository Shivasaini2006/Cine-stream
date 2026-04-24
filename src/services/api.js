import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// Using our own Vercel/Vite proxy to bypass ISP blocks
const TMDB_BASE_URL = '/tmdb-api';

export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
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
      `/gemini-api/v1beta/models/gemini-1.5-flash:generateContent`,
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
