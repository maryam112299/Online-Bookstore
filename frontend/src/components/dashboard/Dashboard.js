import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BooksList from './BooksList';
import AddBookForm from './AddBookForm';
import BookDetails from './BookDetails'; 
import './Dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [books, setBooks] = useState([]);
   const [selectedBook, setSelectedBook] = useState(null); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser?.email) {
          navigate('/login');
          return;
        }

        const response = await fetch(`http://localhost:8081/profile?email=${storedUser.email}`);
        const data = await response.json();
        
        if (data.success) {
          const updatedUser = { ...storedUser, ...data.profile };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        navigate('/login');
      }
    };

    fetchUserProfile();
    fetchBooks();
  }, [navigate]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8081/books');
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    setShowAddBook(false);
  };

  const handleBackToDashboard = () => {
    setShowProfile(false);
    setShowAddBook(false);
  };

  const handleProfileUpdate = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
    const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBackToList = () => {
    setSelectedBook(null);
  };


  const handleAddBookSuccess = () => {
    setShowAddBook(false);
    fetchBooks(); // Refresh the book list
  };

  if (!user) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          Welcome{user.firstName ? `, ${user.firstName}` : ''}!
        </div>
        <div className="nav-buttons">
          <button 
            onClick={() => {
              setShowAddBook(true);
              setShowProfile(false);
            }} 
            className="nav-btn add-book-btn"
          >
            Add Book
          </button>
          <button 
            onClick={handleShowProfile} 
            className={`nav-btn profile-btn ${showProfile ? 'active' : ''}`}
          >
            Profile
          </button>
          <button onClick={handleLogout} className="nav-btn logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {showProfile ? (
          <ProfileSection 
            user={user} 
            onUpdate={handleProfileUpdate}
            onBack={handleBackToDashboard}
          />
        ) : showAddBook ? (
          <AddBookForm 
            onCancel={handleBackToDashboard}
            onSuccess={handleAddBookSuccess}
          />
          ) : selectedBook ? (
          <BookDetails 
            book={selectedBook} 
            onBack={handleBackToList}
          />
        ) : (
          <div className="main-content">
            <BooksList books={books}
            onBookClick={handleBookClick}
            />
            
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileSection = ({ user, onUpdate, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (data.success) {
        onUpdate(formData);
        setIsEditing(false);
      } else {
        alert('Update failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Update failed. Please try again.');
    }
  };

  return (
    <div className="profile-section">
      <div className="profile-header">
        <h2>Profile Information</h2>
        <button 
          onClick={onBack}
          className="back-btn"
        >
          Back to Dashboard
        </button>
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-view">
          <div className="profile-info">
            <p><strong>First Name:</strong> {user.firstName || 'Not provided'}</p>
            <p><strong>Last Name:</strong> {user.lastName || 'Not provided'}</p>
            <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
          </div>
          
          <button 
            onClick={() => setIsEditing(true)}
            className="edit-btn"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};