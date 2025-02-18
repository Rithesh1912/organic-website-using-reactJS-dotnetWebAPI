import React from 'react';
import './cards.css';

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="col-12 col-md-4 col-lg-3 mb-4">
      <div className="card product-card">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          <p className="card-text text-center">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
