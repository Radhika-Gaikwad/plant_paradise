// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [yearFilter, setYearFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getMyOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const years = [
    ...new Set(orders.map((o) => new Date(o.createdOn).getFullYear())),
  ];

  let filteredOrders = [...orders];
  if (yearFilter !== "all") {
    filteredOrders = filteredOrders.filter(
      (o) => new Date(o.createdOn).getFullYear().toString() === yearFilter
    );
  }
  if (sortOption === "latest") {
    filteredOrders.sort(
      (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
    );
  } else {
    filteredOrders.sort(
      (a, b) => new Date(a.createdOn) - new Date(b.createdOn)
    );
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 gap-6">
      {/* Filters */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 sticky top-4">
          <h2 className="font-semibold mb-3 text-sm sm:text-base">Filters</h2>

          {/* Sort */}
          <label className="block mb-2 text-xs sm:text-sm font-medium">
            Sort by
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border rounded-md p-2 mb-4 text-sm"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          {/* Year */}
          <label className="block mb-2 text-xs sm:text-sm font-medium">
            Year
          </label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          >
            <option value="all">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="w-full lg:w-3/4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">My Orders</h1>
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-2 sm:p-3 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Product Images */}
                  <div className="flex gap-2 flex-shrink-0">
                    {order.products.slice(0, 3).map((p) => (
                      <img
                        key={p.productId}
                        src={p.imageUrl}
                        alt={p.productName}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-md border"
                      />
                    ))}
                    {order.products.length > 3 && (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border rounded-md text-xs bg-gray-50">
                        +{order.products.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 min-w-[150px]">
                    <p className="font-medium text-sm sm:text-base">
                      Order #{order.orderId.slice(0, 8)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdOn).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Price & Items */}
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-sm sm:text-base">
                      ₹{order.totalPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.products.length} item(s)
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-center ${
                      order.status === "PLACED"
                        ? "bg-blue-100 text-blue-600"
                        : order.status === "DELIVERED"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;