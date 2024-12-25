import React from "react";
import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Our Products
      </h1>
      <ProductList />
    </div>
  );
};

export default Products;
