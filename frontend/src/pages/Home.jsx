import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page animate-fade-in">
      <section className="hero">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Fashion Campaign" 
          className="hero-image"
        />
        <div className="hero-content">
          <h1>Elegance Redefined</h1>
          <p>Discover the Autumn/Winter Collection.</p>
          <Link to="/shop" className="btn-primary">Explore the Collection</Link>
        </div>
      </section>

      <section className="editorial-section container">
        <div className="editorial-grid">
          <div className="editorial-text">
            <h2>The Art of Restraint</h2>
            <p>
              At AURELIA, we believe in the power of minimalist design. 
              Our pieces are crafted from the finest materials, designed to 
              transcend seasons and fleeting trends. It is not just fashion; 
              it is an enduring legacy of style.
            </p>
            <Link to="/about" className="btn-secondary">Our Philosophy</Link>
          </div>
          <div className="editorial-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000" 
              alt="Editorial" 
              className="editorial-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
