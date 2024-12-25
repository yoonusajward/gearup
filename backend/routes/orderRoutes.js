import express from "express";
import { sendEmail } from "../services/emailService.js";
import db from "../index.js";

const router = express.Router();

router.post("/place-order", (req, res) => {
  const { user_id, total_price, shipping_address, order_items, email } = req.body;

  if (!user_id || !total_price || !shipping_address || !order_items.length || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Save the order in the database
  const orderQuery = `
    INSERT INTO orders (user_id, total_price, shipping_address)
    VALUES (?, ?, ?)
  `;
  db.query(orderQuery, [user_id, total_price, shipping_address], (err, orderResult) => {
    if (err) {
      console.error("Failed to save order:", err.message);
      return res.status(500).json({ error: "Failed to save order" });
    }

    const orderId = orderResult.insertId;

    // Save order items
    const orderItemsQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ?
    `;
    const orderItemsValues = order_items.map(item => [orderId, item.product_id, item.quantity, item.price]);

    db.query(orderItemsQuery, [orderItemsValues], (err) => {
      if (err) {
        console.error("Failed to save order items:", err.message);
        return res.status(500).json({ error: "Failed to save order items" });
      }

      // Send confirmation email
      sendEmail(email, "Order Confirmation - GearUp", `Thank you for your order! Your order ID is ${orderId}.`)
        .then(() => {
          return res.status(200).json({ message: "Order placed successfully and email sent!" });
        })
        .catch(() => {
          return res.status(200).json({ message: "Order placed successfully. (Email simulation only)" });
        });
    });
  });
});

export default router;
