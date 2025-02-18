import React from 'react';
import { FaStar } from 'react-icons/fa';
import './cards.css'; // Ensure your custom styles are imported

const ReviewCard = ({ image, name, review, rating }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="review-card">
        <div className="review-img">
          <img src={image} alt={`Customer ${name}`} />
        </div>
        <h5>{name}</h5>
        <p>{review}</p>
        <div className="d-flex">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} style={{ color: index < rating ? '#FFD700' : '#ddd' }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
