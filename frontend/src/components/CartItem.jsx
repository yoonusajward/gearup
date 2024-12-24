import React from "react";

const CartItem = ({ item, onRemove, onUpdate }) => {
  const handleUpdate = () => {
    const updatedQuantity = prompt("Enter new quantity:", item.quantity);
    if (updatedQuantity) onUpdate(item.cart_id, updatedQuantity);
  };

  return (
    <div className="cart-item">
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={handleUpdate}>Update Quantity</button>
      <button onClick={() => onRemove(item.cart_id)}>Remove</button>
    </div>
  );
};

export default CartItem;
