// src/components/ui/ProcessingPopup.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ProcessingPopup({ message }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm flex flex-col items-center"
      >
        {/* Loader animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mb-4"
        />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </motion.div>
    </div>
  );
}
