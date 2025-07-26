import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SplashScreen.css";
import SocialLinks from "../sociallinks/SocialLinks";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredAnime = [
    { name: "Dandadan", emoji: "⚡" },
    { name: "One Piece", emoji: "🏴‍☠️" },
    { name: "Solo Leveling", emoji: "⚔️" },
    { name: "Jujutsu Kaisen 2nd Season", emoji: "👹" },
    { name: "Blue Lock", emoji: "⚽" },
    { name: "The Eminence in Shadow", emoji: "🗡️" },
    { name: "Frieren Beyond Journey End", emoji: "🧙‍♀️" },
    { name: "Dragon Ball Daima", emoji: "🐉" }
  ];

  return (
    <div className="splashscreen">
      <div className="splashoverlay">
        <div className="splash-container">
          <nav className="top-nav">
            <Link to="/home">🏠 Home</Link>
            <Link to="/movie">🎬 Movies</Link>
            <Link to="/tv">📺 TV Series</Link>
            <Link to="/most-popular">🔥 Most Popular</Link>
            <Link to="/new-season">✨ New Season</Link>
          </nav>

          <div className="splash-content">
            <div className="logo">
              <h1>🎌 Ani<span>Focus</span> 🎌</h1>
              <p className="logo-subtitle">Your Gateway to Infinite Anime Adventures</p>
            </div>

            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="🔍 Discover your next favorite anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>

            <div className="top-search">
              <span>🎯 Trending Now: </span>
              {featuredAnime.map((anime, index) => (
                <span key={index}>
                  <span 
                    className="search-item" 
                    onClick={() => navigate(`/search?keyword=${encodeURIComponent(anime.name)}`)}
                  >
                    {anime.emoji} {anime.name}
                  </span>
                  {index < featuredAnime.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>

            <div className="welcome-message">
              <h2>Welcome to Your Anime Universe! 🌟</h2>
              <p>Join thousands of anime lovers discovering amazing stories every day</p>
            </div>

            <div className="action-buttons">
              <button className="watch-btn" onClick={() => navigate("/home")}>
                🚀 Start Watching Now
              </button>
              <button className="explore-btn" onClick={() => navigate("/most-popular")}>
                🎭 Explore Popular
              </button>
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Anime Titles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1M+</span>
                <span className="stat-label">Happy Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Always Available</span>
              </div>
            </div>
          </div>
        </div>

        <section className="social-section">
          <div className="share-container">
            <div className="share-content">
              <div className="share-text">
                <span>📢 Share Anime Focus</span>
                <p>Spread the anime love with your friends! 💝</p>
              </div>
              <SocialLinks />
            </div>
          </div>

          <div className="description-text">
            🌟 Experience the ultimate anime streaming platform! Join our community of anime enthusiasts and discover endless entertainment. Perfect for both seasoned otaku and newcomers! 🎮✨
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <span>🎥 Crystal Clear HD</span>
              <p>
                Watch anime in stunning 1080p quality with zero buffering.
              </p>
            </div>
            <div className="feature-item">
              <span>⚡ Lightning Fast Updates</span>
              <p>
                Get latest episodes within hours of Japan release.
              </p>
            </div>
            <div className="feature-item">
              <span>📱 Watch Anywhere</span>
              <p>
                Seamless streaming on phone, tablet, or computer.
              </p>
            </div>
            <div className="feature-item">
              <span>🌍 Global Community</span>
              <p>
                Connect with anime fans worldwide and share experiences.
              </p>
            </div>
            <div className="feature-item">
              <span>🚫 Ad-Free Experience</span>
              <p>
                Enjoy completely uninterrupted anime streaming.
              </p>
            </div>
            <div className="feature-item">
              <span>📚 Massive Library</span>
              <p>
                Thousands of titles from classics to latest releases.
              </p>
            </div>
          </div>

          <div className="returning-user-section">
            <h3>🎊 Why Our Users Keep Coming Back</h3>
            <div className="testimonials">
              <div className="testimonial">
                <p>"Best anime site ever! I check daily for new episodes!" 🤩</p>
                <span>- Anime Lover</span>
              </div>
              <div className="testimonial">
                <p>"The quality is amazing and it's so easy to find new shows!" ⭐</p>
                <span>- Daily User</span>
              </div>
              <div className="testimonial">
                <p>"I've discovered so many amazing anime here!" 💖</p>
                <span>- Community Member</span>
              </div>
            </div>
          </div>

          <div className="copyright">
            © 2025 Anime Focus - Made with ❤️ for anime lovers worldwide • All rights reserved
          </div>
        </section>
      </div>
    </div>
  );
}
