import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/PlaceOrder.css";

const PlaceOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: 1,
    total_price: 0,
    shipping_address: "",
    email: "",
    order_items: [],
  });

  useEffect(() => {
    if (state && state.cartItems) {
      const cartItems = state.cartItems;
      const total = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      setFormData({
        ...formData,
        order_items: cartItems,
        total_price: total,
      });
    }
  }, [state, formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/orders/place-order",
        formData
      );
      alert(response.data.message);
      navigate("/products", { replace: true });
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="place-order">
      <h2>Place Your Order</h2>
      <div className="order-summary">
        <h3>Order Summary:</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {formData.order_items.map((item) => (
              <tr key={item.product_id}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">
          <strong>Total Price: ${formData.total_price}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          name="shipping_address"
          placeholder="Enter Shipping Address"
          value={formData.shipping_address}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
