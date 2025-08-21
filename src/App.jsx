import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import CommonRoutes from "./routes/CommonRoutes";
import { ToastContainer } from "react-toastify";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* User side routes with layout */}
        <Route path="/*" element={<UserRoutes />} />

        {/* Admin side routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Auth & Common routes WITHOUT layout */}
        <Route path="/login" element={<CommonRoutes />} />
        <Route path="/signup" element={<CommonRoutes />} />
      </Routes>
         <ToastContainer
  position="top-right"
  autoClose={1500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
/>

    </Router>
  );
}

export default App;
