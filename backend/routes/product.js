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

// Get all products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching products: ', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    // Check if result is empty, send an empty array if no products found
    return res.status(200).json(result.length ? result : []);
  });
});

// Get product details by product_id
router.get('/:product_id', (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT * FROM products WHERE product_id = ?';
  db.query(query, [product_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch product details' });
    }
    return res.status(200).json(result[0]);
  });
});

export default router;
