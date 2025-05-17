import React from 'react';
import './Dashboard.css';

const BookCard = ({ book, onClick }) => {
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(book.rate);
    const hasHalfStar = book.rate % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star">½</span>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">By {book.author}</p>
        <div className="book-meta">
          <span className="price">${book.price.toFixed(2)}</span>
          <span className={`stock ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="rating">
          {renderRating()} ({book.rate.toFixed(1)})
        </div>
        <span className="category">{book.category}</span>
      </div>
    </div>
  );
};

export default BookCard;