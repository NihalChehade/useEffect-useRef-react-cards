import React from 'react';

const Card = ({ image }) => {
  return (
    <img src={image} alt="card" style={{ width: '150px', margin: '10px' }} />
  );
};

export default Card;