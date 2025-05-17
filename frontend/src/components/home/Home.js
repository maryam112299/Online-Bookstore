// src/components/home/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1 className="home-title">Welcome to Our Bookstore</h1>
        <div className="home-buttons">
          <button
            className="home-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="home-button"
            onClick={() => navigate('/signup')}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
