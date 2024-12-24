import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">No products available.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Products</h2>
      <div className="mt-6">
        {products.map((product) => (
          <ProductItem
            key={product.product_id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
