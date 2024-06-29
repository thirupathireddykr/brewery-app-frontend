import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './index.css';

const StarReview = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (selectedRating) => {
    setRating(selectedRating);
    if (onRate) {
      onRate(selectedRating);
    }
  };

  return (
    <div className="star-container">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            size={24}
            className={`star ${starValue <= rating ? 'rated' : ''}`}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarReview;
