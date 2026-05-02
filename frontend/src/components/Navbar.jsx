import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItems, setIsCartOpen } = useCart();
  
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="icon-btn">
            <Menu size={24} />
          </button>
          <button className="icon-btn">
            <Search size={24} />
          </button>
        </div>
        
        <div className="navbar-center">
          <Link to="/" className="brand-logo">AURELIA</Link>
        </div>
        
        <div className="navbar-right">
          <div className="nav-links">
            <Link to="/shop">Shop</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <button className="icon-btn cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={24} />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
