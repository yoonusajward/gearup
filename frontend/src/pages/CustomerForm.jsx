import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/css/CustomerForm.css";

const CustomerForm = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: userDetails.firstName,
      last_name: userDetails.lastName,
      email: userDetails.email,
      phone_number: userDetails.phoneNumber,
      address: userDetails.address,
    };

    try {
      const response = await axios.post(
        "http://localhost:8800/users",
        userData
      );

      if (response.status === 201) {
        setSuccessMessage("Customer details have been stored successfully.");
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving customer details:", error);
      alert("Failed to save customer details. Please try again.");
    }
  };

  return (
    <div className="customer-form">
      <h2>Customer Details</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
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
