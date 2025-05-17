import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import './Dashboard.css';

const BooksList = ({ onBookClick }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8081/books');
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8081/books/${bookId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        fetchBooks(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <div>Loading books...</div>;

  return (
    <div className="books-container">
      <h2>Book Catalog</h2>
      {books.length === 0 ? (
        <p>No books available yet.</p>
      ) : (
        <div className="books-grid">
          {books.map(book => (
            <div key={book.id} className="book-card-wrapper">
              <BookCard 
                book={book}
                onClick={onBookClick ? () => onBookClick(book) : undefined}
              />
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(book.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksList;