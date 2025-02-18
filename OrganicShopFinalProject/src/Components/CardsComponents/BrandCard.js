import React from 'react';

const BrandCard = ({ logo }) => {
  return (
    <div className="col-md-4">
      <img src={logo} className="img-fluid" alt="Brand" />
    </div>
  );
};

export default BrandCard;
