import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { getGeminiMoodMatch } from '../services/api';

const MoodMatcher = ({ onMovieFound }) => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return;

    try {
      setLoading(true);
      setError('');
      const movieTitle = await getGeminiMoodMatch(mood);
      onMovieFound(movieTitle);
      setMood(''); // clear input after successful search
    } catch (err) {
      console.error('MoodMatcher Error:', err.message || err);
      
      let errorMessage = 'Failed to find a match. Check your API key or try again.';
      if (err.message === 'Gemini API key is not configured.') {
        errorMessage = 'Gemini API key is missing. Please add it to your .env file.';
      } else if (err.response && err.response.status === 429) {
        errorMessage = 'You are making too many requests too quickly! Please wait a minute before trying again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-2 p-6 rounded-xl shadow-lg border border-white/5 max-w-2xl mx-auto my-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold">AI Mood Matcher</h2>
      </div>
      <p className="text-text-muted text-sm mb-4">
        Describe how you're feeling or what kind of vibe you want, and our AI will find the perfect movie for you.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row relative items-stretch sm:items-center gap-3 sm:gap-2">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g. I feel sad but want action..."
          className="flex-1 bg-black text-white px-4 py-3 rounded-lg border border-white/20 focus:border-accent focus:outline-none transition-colors w-full"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !mood.trim()}
          className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] w-full sm:w-auto"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Match Me'}
        </button>
      </form>
      
      {error && (
        <p className="text-red-500 text-sm mt-3">{error}</p>
      )}
    </div>
  );
};

export default MoodMatcher;
