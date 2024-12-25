import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import "./css/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Products</h2>
      <div className="product-list-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product.product_id} product={product} />
          ))
        ) : (
          <p className="no-products-message">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
