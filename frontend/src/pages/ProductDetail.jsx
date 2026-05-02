import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="container mt-8">Product not found.</div>;
  }

  return (
    <div className="product-detail-page container animate-fade-in">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> Back to Collection
      </Link>
      
      <div className="product-detail-grid">
        <div className="product-detail-image-wrapper">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">${product.price.toLocaleString()}</p>
          
          <div className="product-detail-description">
            <p>{product.description}</p>
          </div>
          
          <div className="product-meta">
            <span>Category: {product.category}</span>
            <span>Availability: {product.stock > 0 ? 'In Stock' : 'Sold Out'}</span>
          </div>

          <button 
            className="btn-primary add-to-cart-btn"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Sold Out' : 'Add to Bag'}
          </button>

          <div className="product-accordion">
            <details>
              <summary>Details & Care</summary>
              <div className="accordion-content">
                <p>Dry clean only. Handle with care. Keep away from direct sunlight to preserve the color integrity.</p>
              </div>
            </details>
            <details>
              <summary>Shipping & Returns</summary>
              <div className="accordion-content">
                <p>Complimentary express shipping on all orders. Returns accepted within 30 days of delivery in original condition.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
