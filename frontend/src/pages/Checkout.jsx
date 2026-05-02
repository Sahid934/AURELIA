import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, total: cartTotal })
      });
      const data = await response.json();
      
      setOrderId(data.orderId);
      setSuccess(true);
      clearCart();
    } catch (error) {
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-page container animate-fade-in success-view">
        <div className="success-content">
          <h1>Thank You</h1>
          <p>Your order has been placed successfully.</p>
          <p className="order-number">Order Number: {orderId}</p>
          <button className="btn-primary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container animate-fade-in">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-grid">
        <div className="checkout-form-section">
          <h2>Shipping Information</h2>
          <form className="checkout-form" onSubmit={handlePayment}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" required />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input type="text" required />
              </div>
            </div>
            
            <h2 className="mt-8">Payment Details</h2>
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="**** **** **** ****" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input type="text" placeholder="***" required />
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn-primary place-order-btn ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing || cartItems.length === 0}
            >
              {isProcessing ? 'Processing Payment...' : `Place Order • $${cartTotal.toLocaleString()}`}
            </button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item._id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="summary-item-price">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
