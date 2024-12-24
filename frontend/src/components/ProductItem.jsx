import React from "react";

const ProductItem = ({ product, onAddToCart }) => {
  const handleAdd = () => {
    const quantity = prompt("Enter quantity:", 1);
    if (quantity && !isNaN(quantity)) {
      onAddToCart(product.product_id, parseInt(quantity, 10));
    }
  };

  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
