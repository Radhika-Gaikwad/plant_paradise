import { Routes, Route } from "react-router-dom";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


import LoginForm from "../features/authentication/LoginForm";
import SignUpForm from "../features/authentication/SignUpForm";
import Address from "../features/address/Address";

const CommonRoutes = () => {

  const location = useLocation();

  if (location.pathname === "/login") {
    return <LoginForm />;
  }
  if (location.pathname === "/signup") {
    return <SignUpForm />;
  }
  if (location.pathname === "/add-address") {
    return <Address />;
  }

  return null; // Fallback for unmatched routes

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/add-address" element={<Address />} />
      
    </Routes>
  );
 
};

export default CommonRoutes;
