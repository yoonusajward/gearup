import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import cart_icon from "../assets/cart_icon.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GearUp</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Customer Form</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li className="cart-icon">
            <Link to="/cart">
              <img src={cart_icon} alt="Cart Icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
