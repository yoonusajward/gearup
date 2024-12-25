import React from "react";
import { Link } from "react-router-dom";
import "./css/ProductItem.css";

const ProductItem = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <Link to={`/product/${product.product_id}`} className="product-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
