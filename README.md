# Cine-Stream 🎬

Cine-Stream is a modern, responsive movie discovery platform designed to help users find their next favorite film. It features an intuitive interface, seamless search functionality, and a unique AI-powered "Mood Matcher" that recommends movies based on how you feel.

## ✨ Features

- **Trending Movies**: Browse the most popular movies right now, powered by the TMDB API.
- **Search Functionality**: Quickly find specific movies by title.
- **AI Mood Matcher**: Powered by Google's Gemini API, this feature allows you to describe your current mood or what you're looking for, and it suggests the perfect movie to match.
- **Favorites List**: Save movies to your personalized favorites list for easy access later.
- **Detailed Movie Views**: View detailed information about movies in a clean, distraction-free modal.
- **Modern UI/UX**: Beautiful, responsive design built with Tailwind CSS v4 and smooth animations using Framer Motion.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Fetching**: Axios
- **APIs Used**: TMDB API (Movie Data), Google Gemini API (AI Recommendations)

## 🚀 Getting Started

1. **Clone the repository** (if applicable) or download the project files.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**: Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` to view the application in your browser.

## 💡 How the AI Mood Matcher Works
The Mood Matcher leverages the Gemini Flash model to interpret free-form text input (e.g., "I want a cozy movie for a rainy evening" or "Something mind-bending"). It processes the prompt and returns a highly relevant movie title, which is then automatically queried against the TMDB database to display the movie card!
