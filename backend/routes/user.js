import express from 'express';
import mysql from 'mysql2';

const router = express.Router();

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yoonus0008?',
  database: 'gearup',
});

// Create a new user
router.post('/', (req, res) => {
  const { first_name, last_name, email, password, phone_number, address } = req.body;
  const query = 'INSERT INTO users (first_name, last_name, email, password, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [first_name, last_name, email, password, phone_number, address], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
    return res.status(201).json({ message: 'User created successfully', user_id: result.insertId });
  });
});

// Get user details by user_id
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM users WHERE user_id = ?';
  db.query(query, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
    return res.status(200).json(result[0]);
  });
});

export default router;
