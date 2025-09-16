import React from "react";
import { motion } from "framer-motion";

export default function PaymentPopup({ amount, onClose, onConfirm }) {
  const paymentMethods = [
    { id: "gpay", label: "Google Pay (GPay)" },
    { id: "phonepe", label: "PhonePe" },
    { id: "paytm", label: "Paytm" },
    { id: "upi", label: "UPI" },
    { id: "netbanking", label: "Net Banking" },
    { id: "card", label: "Credit/Debit Card" },
  ];

  const [selectedMethod, setSelectedMethod] = React.useState(null);

  const handleConfirm = () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }
    onConfirm(selectedMethod);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Mock Payment</h2>
        <p className="text-gray-600 text-center mb-4">
          Pay <span className="font-semibold text-green-600">₹{amount}</span> using:
        </p>

        <div className="space-y-2 mb-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                selectedMethod === method.id ? "border-green-600 bg-green-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                className="mr-3"
              />
              {method.label}
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Pay Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
