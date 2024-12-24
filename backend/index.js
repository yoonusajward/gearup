import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies


// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yoonus0008?',
  database: 'gearup',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Routes
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Start the server
app.listen(8800, () => {
  console.log('Backend is running on port 8800');
});
