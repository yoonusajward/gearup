import React, { useState } from "react";
import axios from "axios";
import "./css/CartItem.css";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [error, setError] = useState(null);

  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:8800/cart/${item.cart_id}`);
      onRemove(item.cart_id);
      alert("Product removed from cart");
    } catch (err) {
      console.log(err);
      alert("Failed to remove product from cart");
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(`http://localhost:8800/cart/${item.cart_id}`, {
        quantity: newQuantity,
      });
      setQuantity(newQuantity);
      onUpdateQuantity(item.cart_id, newQuantity);
    } catch (err) {
      setError("Failed to update quantity");
      console.log(err);
    }
  };

  const formattedPrice = item.price
    ? `$${(item.price * quantity).toFixed(2)}`
    : "$0.00";

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.product_name}</h3>
        <div className="cart-item-quantity">
          <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        </div>
        <p className="cart-item-price">{formattedPrice}</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleRemove} className="remove-item-button">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
