import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/ProductDetails.css";

const ProductDetails = ({ cart, setCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCart = async (product) => {
    try {
      const response = await axios.get(`http://localhost:8800/cart`);

      const existingProduct = response.data.find(
        (item) => item.product_id === product.product_id
      );

      if (existingProduct) {
        const updatedQuantity = existingProduct.quantity + 1;
        await axios.put(
          `http://localhost:8800/cart/${existingProduct.cart_id}`,
          { quantity: updatedQuantity }
        );
      } else {
        const response = await axios.post("http://localhost:8800/cart", {
          product_id: product.product_id,
        });

        if (response.status === 201) {
          const updatedCart = [...cart, { ...product, quantity: 1 }];
          setCart(updatedCart);
        }
      }

      navigate("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details-container">
      <h1 className="product-details-title">{product.name}</h1>
      <div className="product-details-content">
        <div className="product-details-info">
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <button
            className="add-to-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
