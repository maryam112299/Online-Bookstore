import React from 'react';
import './Dashboard.css';

const BookDetails = ({ book, onBack }) => {
  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(book.rate);
    const hasHalfStar = book.rate % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star">½</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  return (
    <div className="book-details-container">
      <button 
        onClick={onBack}
        className="back-btn"
      >
        ← Back to Books
      </button>
      
      <div className="book-details-card">
        <div className="book-details-header">
          <h2>{book.title}</h2>
          <p className="book-author">by {book.author}</p>
        </div>

        <div className="book-details-content">
          <div className="book-details-meta">
            <div className="book-meta-item">
              <span className="meta-label">Price:</span>
              <span className="meta-value">${book.price.toFixed(2)}</span>
            </div>
            <div className="book-meta-item">
              <span className="meta-label">Availability:</span>
              <span className={`meta-value ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            <div className="book-meta-item">
              <span className="meta-label">Rating:</span>
              <span className="meta-value">
                {renderRatingStars()} ({book.rate.toFixed(1)}/5)
              </span>
            </div>
            <div className="book-meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value category-tag">{book.category}</span>
            </div>
          </div>
            <div className="book-description">
                <h3>About This Book</h3>
                <p>{book.description || 'No description available.'}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;