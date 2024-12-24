import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerForm from "./pages/CustomerForm";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<CustomerForm setUserId={setUserId} />} />

          <Route path="/products" element={<Products userId={userId} />} />

          <Route path="/cart" element={<CartPage userId={userId} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
