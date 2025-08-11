import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "../features/authentication/LoginForm";
import SignUpForm from "../features/authentication/SignUpForm";
import Address from "../features/address/Address";

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/add-address" element={<Address />} />
    </Routes>
  );
};

export default CommonRoutes;
