import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCart } from "../services/api";
import CartItem from "../components/CartItem";

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await getCart(userId);
      setCartItems(response.data);
    };
    fetchCart();
  }, [userId]);

  const handleRemove = async (cartId) => {
    await removeFromCart(cartId);
    setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
  };

  const handleUpdate = async (cartId, updatedQuantity) => {
    await updateCart(cartId, updatedQuantity);
    setCartItems(
      cartItems.map((item) =>
        item.cart_id === cartId ? { ...item, quantity: updatedQuantity } : item
      )
    );
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            key={item.cart_id}
            item={item}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
