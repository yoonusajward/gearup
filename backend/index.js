import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Routes
app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

// Export the db connection so it can be used in other files
export default db;

// Fetch all products
app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Failed to fetch products: ", err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
    return res.status(200).json(data);
  });
});

// Fetch a specific product
app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const q = "SELECT * FROM products WHERE product_id = ?";
  db.query(q, [productId], (err, data) => {
    if (err) {
      console.error("Failed to fetch product: ", err);
      return res.status(500).json({ error: "Failed to fetch product" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(data[0]);
  });
});

// Add a user
app.post("/users", (req, res) => {
  const { first_name, last_name, email, phone_number, address } = req.body;
  const q =
    "INSERT INTO users (first_name, last_name, email, phone_number, address) VALUES (?, ?, ?, ?, ?)";
  db.query(q, [first_name, last_name, email, phone_number, address], (err) => {
    if (err) {
      console.error("Failed to add user: ", err);
      return res.status(500).json({ error: "Failed to add user" });
    }
    return res.status(201).json("User added successfully");
  });
});

// Fetch all cart items
app.get("/cart", (req, res) => {
  const q = `
    SELECT c.cart_id, c.user_id, c.product_id, p.name AS product_name, p.price, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.product_id
  `;
  db.query(q, (err, data) => {
    if (err) {
      console.error("Failed to fetch cart items: ", err);
      return res.status(500).json({ error: "Failed to fetch cart items" });
    }
    return res.status(200).json(data);
  });
});

// Add a product to the cart
app.post("/cart", (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ error: "Missing product_id" });
  }

  const checkProductQuery = "SELECT * FROM products WHERE product_id = ?";
  db.query(checkProductQuery, [product_id], (err, productResult) => {
    if (err) {
      console.error("Error checking product:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (productResult.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const insertCartQuery = `
      INSERT INTO cart (product_id, quantity)
      VALUES (?, 1)
    `;
    db.query(insertCartQuery, [product_id], (err) => {
      if (err) {
        console.error("Failed to add product to cart:", err.message);
        return res.status(500).json({ error: "Failed to add product to cart" });
      }
      return res.status(201).json({ message: "Product added to cart successfully" });
    });
  });
});

// Update quantity in cart
app.put("/cart/:cart_id", (req, res) => {
  const { cart_id } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be greater than 0" });
  }

  const q = "UPDATE cart SET quantity = ? WHERE cart_id = ?";
  db.query(q, [quantity, cart_id], (err, result) => {
    if (err) {
      console.error("Failed to update quantity: ", err);
      return res.status(500).json({ error: "Failed to update quantity" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    return res.status(200).json({ message: "Quantity updated successfully" });
  });
});

// Remove a product from the cart
app.delete("/cart/:cart_id", (req, res) => {
  const { cart_id } = req.params;
  const q = "DELETE FROM cart WHERE cart_id = ?";
  db.query(q, [cart_id], (err, result) => {
    if (err) {
      console.error("Failed to remove product from cart: ", err);
      return res.status(500).json({ error: "Failed to remove product from cart" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    return res.status(200).json("Product removed from cart successfully");
  });
});

app.use("/api/orders", orderRoutes);

// Start the server
app.listen(8800, () => {
  console.log("Connected to backend on port 8800");
});
