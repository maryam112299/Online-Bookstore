const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('apidoc.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


require('dotenv').config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Hashing error:', err);
      return res.status(500).json({ success: false, message: 'Error hashing password' });
    }

    const sql = "INSERT INTO users (`firstName`, `lastName`, `email`, `password`) VALUES (?, ?, ?, ?)";
    const values = [firstName, lastName, email, hashedPassword];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Database operation failed', error: err.message });
      }

      return res.json({ success: true, message: 'User registered successfully', userId: result.insertId });
    });
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt compare error:', err);
        return res.status(500).json({ success: false, message: 'Internal error during login' });
      }

      if (isMatch) {
        return res.json({
          success: true,
          message: 'Login successful',
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    });
  });
});

app.get('/profile', (req, res) => {
  const email = req.query.email;

  const sql = "SELECT firstName, lastName, email, profilePicture FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    if (results.length > 0) {
      return res.json({ success: true, profile: results[0] });
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  });
});

app.post('/profile/update', (req, res) => {
  const { firstName, lastName, email, profilePicture } = req.body;

  const sql = "UPDATE users SET firstName = ?, lastName = ?, profilePicture = ? WHERE email = ?";
  db.query(sql, [firstName, lastName, profilePicture, email], (err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    return res.json({ success: true, message: "Profile updated successfully" });
  });
});


app.get('/books', (req, res) => {
  const sql = "SELECT id, title, author, price, stock, rate, category, description FROM books"; 
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, books: results });
  });
});

app.post('/books', (req, res) => {
  const { title, author, price, stock, rate, category, description } = req.body;
  
  if (!title || !author || !category) {
    return res.status(400).json({ 
      success: false, 
      message: 'Title, author, and category are required' 
    });
  }

  const sql = `INSERT INTO books 
    (title, author, price, stock, rate, category, description) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, 
    [title, author, price || 0, stock || 0, rate || 0, category, description || ''], 
    (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ 
        success: true, 
        bookId: result.insertId,
        message: 'Book added successfully'
      });
    }
  );
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: 'Book deleted successfully' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
