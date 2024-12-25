import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerForm from "./pages/CustomerForm";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CustomerForm />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/product/:productId"
            element={<ProductDetails cart={cart} setCart={setCart} />}
          />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
