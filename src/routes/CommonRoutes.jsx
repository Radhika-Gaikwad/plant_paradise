import React from "react";
import { useLocation } from "react-router-dom";
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
};

export default CommonRoutes;
