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

// Add product to cart
router.post('/', (req, res) => {
  const { user_id, product_id, quantity, status } = req.body;
  const query = 'INSERT INTO cart (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, product_id, quantity, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add product to cart' });
    }
    return res.status(201).json({ message: 'Product added to cart' });
  });
});

// Get cart items
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM cart WHERE user_id = ?';
  db.query(query, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch cart' });
    }
    return res.status(200).json(result);
  });
});

// Update cart item
router.put('/:cart_id', (req, res) => {
  const { cart_id } = req.params;
  const { quantity } = req.body;
  const query = 'UPDATE cart SET quantity = ? WHERE cart_id = ?';
  db.query(query, [quantity, cart_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update cart' });
    }
    return res.status(200).json({ message: 'Cart updated successfully' });
  });
});

// Remove product from cart
router.delete('/:cart_id', (req, res) => {
  const { cart_id } = req.params;
  const query = 'DELETE FROM cart WHERE cart_id = ?';
  db.query(query, [cart_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to remove product from cart' });
    }
    return res.status(200).json({ message: 'Product removed from cart' });
  });
});

export default router;
