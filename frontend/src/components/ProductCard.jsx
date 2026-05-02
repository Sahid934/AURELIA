import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="stock-badge">Limited Quantity</span>
        )}
        {product.stock === 0 && (
          <span className="stock-badge sold-out">Sold Out</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
