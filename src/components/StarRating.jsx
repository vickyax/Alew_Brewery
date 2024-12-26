// StarRating.jsx
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Using react-icons for stars

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="star-rating">
      {Array(fullStars)
        .fill(<FaStar className="star" />)
        .map((star, index) => (
          <span key={`full-${index}`}>{star}</span>
        ))}
      {halfStar > 0 && <FaStarHalfAlt className="star" />}
      {Array(emptyStars)
        .fill(<FaRegStar className="star" />)
        .map((star, index) => (
          <span key={`empty-${index}`}>{star}</span>
        ))}
    </div>
  );
}

export default StarRating;
