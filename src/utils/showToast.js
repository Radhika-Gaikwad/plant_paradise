// src/utils/showToast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "success") => {
  const config = {
    // don't override autoClose here
    style: {
      background:
        type === "success"
          ? "linear-gradient(135deg, #1b5e20, #2e7d32)"
          : "linear-gradient(135deg, #b71c1c, #d32f2f)",
      color: "#fff",
      borderRadius: "12px",
      fontWeight: "600",
      letterSpacing: "0.5px",
      boxShadow:
        type === "success"
          ? "0px 4px 15px rgba(27, 94, 32, 0.5)"
          : "0px 4px 15px rgba(183, 28, 28, 0.5)",
    },
  };

  if (type === "success") {
    toast.success(`🌿 ${message}`, config);
  } else {
    toast.error(`❌ ${message}`, config);
  }
};
