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

// Create an order
router.post('/', (req, res) => {
  const { user_id, total_price, shipping_address, status } = req.body;
  const query = 'INSERT INTO orders (user_id, total_price, shipping_address, status, created_at) VALUES (?, ?, ?, ?, NOW())';
  db.query(query, [user_id, total_price, shipping_address, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create order' });
    }
    return res.status(201).json({ message: 'Order created successfully', order_id: result.insertId });
  });
});

// Get order details by user_id
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM orders WHERE user_id = ?';
  db.query(query, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    return res.status(200).json(result);
  });
});

// Get order items by order_id
router.get('/items/:order_id', (req, res) => {
  const { order_id } = req.params;
  const query = 'SELECT * FROM order_items WHERE order_id = ?';
  db.query(query, [order_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch order items' });
    }
    return res.status(200).json(result);
  });
});

export default router;
