import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/css/CustomerForm.css";

const CustomerForm = ({ setUserId }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserId = Math.floor(Math.random() * 1000);
    setUserId(newUserId);
    navigate("/products");
  };

  return (
    <div className="customer-form">
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userDetails.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userDetails.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={userDetails.phoneNumber}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={userDetails.address}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerForm;
