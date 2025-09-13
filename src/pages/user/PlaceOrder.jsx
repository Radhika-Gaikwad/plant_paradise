import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";

const PlaceOrder = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 0; // later can calculate based on coupons
  const total = subtotal - discount;

  // Confirm order
  const confirmOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty ❌");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(cartItems);
    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart();
    toast.success("Order placed successfully ✅");
    navigate("/orders");
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4 lg:px-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Secure Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section: Checkout Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Info */}
            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Delivery Information</h2>
              <p className="text-gray-500">No address selected</p>
              <button className="text-green-600 mt-2 text-sm font-medium hover:underline">
                + Select Address
              </button>
            </div>

            {/* Coupon */}
            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Apply Coupon</h2>
              <p className="text-orange-600 bg-orange-50 px-3 py-2 rounded-md text-sm">
                No available coupons right now
              </p>
            </div>

            {/* Order Type */}
            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Order Type</h2>
              <div className="flex gap-4">
                <button className="flex-1 border rounded-lg py-3 text-center font-medium bg-green-50 border-green-500">
                  Single Order
                  <p className="text-xs text-gray-500">One-time purchase</p>
                </button>
                <button className="flex-1 border rounded-lg py-3 text-center font-medium text-gray-600 hover:bg-gray-50">
                  Subscription
                  <p className="text-xs text-gray-500">Choose month/week/custom</p>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" />
                  <span>Online Payment</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Section: Order Summary */}
          <div className="border rounded-lg shadow-md p-6 h-fit bg-gray-50">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-green-700">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Payment method: <span className="font-medium">Cash on Delivery</span>
            </p>

            <button
              onClick={confirmOrder}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
