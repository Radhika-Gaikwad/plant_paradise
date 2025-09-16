// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService"; // API to fetch user orders

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders(); // fetch from backend
        setOrders(res || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border border-gray-200 rounded-lg mb-6 p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-green-600">
              Order #{order.id || index + 1}
            </h2>
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b py-2">
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/80"}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.productName}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">
                  ₹{item.finalPrice * item.quantity}
                </p>
              </div>
            ))}
            <p className="text-right font-bold mt-2">Total: ₹{order.total}</p>
            <p className="text-right text-sm text-gray-500">Address: {order.address}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
