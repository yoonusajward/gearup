import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { getProducts } from "../services/api";
import Cart from "./Cart";

const ProductListPage = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("Fetched products:", response.data); // Log the response data

        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]); // Set an empty array if no products are returned
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
        setProducts([]); // In case of an error, set products to empty array
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (productId, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === productId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { productId, quantity }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div>
      <h2>Products</h2>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <Cart
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        userId={userId}
      />
    </div>
  );
};

export default ProductListPage;
