
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

export default function AnimeRating({ animeId, animeTitle, className = "" }) {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load existing ratings from localStorage (in a real app, this would be from a database)
    const savedRatings = JSON.parse(localStorage.getItem('animeRatings') || '{}');
    const animeRatings = savedRatings[animeId] || { ratings: [], average: 0, total: 0 };
    
    setAverageRating(animeRatings.average);
    setTotalRatings(animeRatings.total);
    
    // Check if user has already rated this anime
    const userRatingData = localStorage.getItem(`userRating_${animeId}`);
    if (userRatingData) {
      setUserRating(parseInt(userRatingData));
    }
  }, [animeId]);

  const handleRating = async (rating) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Get existing ratings
      const savedRatings = JSON.parse(localStorage.getItem('animeRatings') || '{}');
      const animeRatings = savedRatings[animeId] || { ratings: [], average: 0, total: 0 };
      
      // Check if user has already rated
      const existingUserRating = localStorage.getItem(`userRating_${animeId}`);
      
      if (existingUserRating) {
        // Update existing rating
        const oldRating = parseInt(existingUserRating);
        const ratingIndex = animeRatings.ratings.indexOf(oldRating);
        if (ratingIndex > -1) {
          animeRatings.ratings[ratingIndex] = rating;
        }
      } else {
        // Add new rating
        animeRatings.ratings.push(rating);
        animeRatings.total += 1;
      }
      
      // Calculate new average
      const sum = animeRatings.ratings.reduce((acc, curr) => acc + curr, 0);
      animeRatings.average = Math.round((sum / animeRatings.ratings.length) * 10) / 10;
      
      // Save to localStorage
      savedRatings[animeId] = animeRatings;
      localStorage.setItem('animeRatings', JSON.stringify(savedRatings));
      localStorage.setItem(`userRating_${animeId}`, rating.toString());
      
      // Update state
      setUserRating(rating);
      setAverageRating(animeRatings.average);
      setTotalRatings(animeRatings.total);
      
      // Show success message
      showNotification('Rating submitted successfully!', 'success');
      
    } catch (error) {
      console.error('Error submitting rating:', error);
      showNotification('Failed to submit rating. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      padding: 12px 20px;
      border-radius: 5px;
      z-index: 9999;
      font-family: Arial, sans-serif;
      font-size: 14px;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const renderStars = (rating, isInteractive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= rating;
      
      return (
        <FontAwesomeIcon
          key={index}
          icon={isFilled ? faStar : faStarOutline}
          className={`text-lg cursor-pointer transition-colors duration-200 ${
            isFilled ? 'text-yellow-400' : 'text-gray-400'
          } ${isInteractive ? 'hover:text-yellow-300' : ''}`}
          onClick={isInteractive ? () => handleRating(starValue) : undefined}
          onMouseEnter={isInteractive ? () => setHoverRating(starValue) : undefined}
          onMouseLeave={isInteractive ? () => setHoverRating(0) : undefined}
        />
      );
    });
  };

  return (
    <div className={`flex flex-col gap-y-3 ${className}`}>
      <div className="flex items-center gap-x-4 flex-wrap">
        <div className="flex items-center gap-x-2">
          <span className="text-sm font-semibold">Rate this anime:</span>
          <div className="flex gap-x-1">
            {renderStars(hoverRating || userRating, true)}
          </div>
          {userRating > 0 && (
            <span className="text-sm text-gray-400">
              (You rated: {userRating}/5)
            </span>
          )}
        </div>
        
        {isSubmitting && (
          <div className="flex items-center gap-x-2">
            <div className="w-4 h-4 border-2 border-[#ffbade] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Submitting...</span>
          </div>
        )}
      </div>
      
      {totalRatings > 0 && (
        <div className="flex items-center gap-x-4 text-sm">
          <div className="flex items-center gap-x-2">
            <span className="font-semibold">Average Rating:</span>
            <div className="flex gap-x-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-[#ffbade] font-bold">
              {averageRating}/5
            </span>
          </div>
          <span className="text-gray-400">
            ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
          </span>
        </div>
      )}
      
      {totalRatings === 0 && (
        <div className="text-sm text-gray-400">
          Be the first to rate this anime!
        </div>
      )}
    </div>
  );
}
