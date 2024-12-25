import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import "./css/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/cart");
        if (response.status === 200) {
          setCartItems(response.data);
        }
      } catch (err) {
        console.error("Error fetching cart data:", err);
        setError("Failed to load cart items.");
      }
    };

    fetchCartData();
  }, []);

  const handleRemove = (cartId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cart_id !== cartId)
    );
  };

  const handleUpdateQuantity = (cartId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleProceedToCheckout = () => {
    navigate("/place-order", { state: { cartItems } });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="cart-page">
      <h2 className="cart-page-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="no-cart-items-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem
              key={item.cart_id}
              item={item}
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
      )}
      <div className="cart-summary">
        <button className="checkout-button" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
