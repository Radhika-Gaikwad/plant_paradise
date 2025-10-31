// src/pages/OrderDetails.jsx
import React, { useEffect, useState } from "react";
import { getMyOrders} from "../../services/orderService";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../services/orderService";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import { OrderDetailsShimmer } from "../../components/shimmers";

const statusSteps = [
  { key: "PLACED", label: "Placed", icon: Package },
  { key: "SHIPPED", label: "Shipped", icon: Truck },
  { key: "OUT FOR DELIVERY", label: "Out for Delivery", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: CheckCircle },
  { key: "CANCELLED", label: "Cancelled", icon: XCircle },
  { key: "FAILED", label: "Failed", icon: XCircle },
];

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

 /* useEffect(() => {
    const fetchOrder = async () => {
      const orders = await getMyOrders();
      const found = orders.find((o) => o._orderId === id);
      setOrder(found || null);
    };
    fetchOrder();
  }, [id]);*/
    useEffect(() => {
    const fetchOrder = async () => {
    try {
      const data = await getOrderById(id); // fetch the order directly
      setOrder(data);
    } catch (error) {
      console.error(error);
      setOrder(null);
    }
    };
     fetchOrder();
  }, [id]);

  if (!order) return <OrderDetailsShimmer/>;

  const currentStepIndex = statusSteps.findIndex(
    (s) => s.key === order.status
  );

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-blue-600 hover:underline flex items-center"
      >
        ← Back to Orders
      </button>

      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">
          Order #{order.orderId}
        </h1>
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
            order.status === "DELIVERED"
              ? "bg-green-100 text-green-700"
              : order.status === "CANCELLED" || order.status === "FAILED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Order Tracker */}
      <div className="flex justify-between relative mb-8">
        {statusSteps.slice(0, 4).map((step, idx) => {
          const Icon = step.icon;
          const completed = idx <= currentStepIndex;
          return (
            <div
              key={step.key}
              className="flex-1 flex flex-col items-center text-center relative"
            >
              {/* Step circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full z-10 ${
                  completed ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                <Icon size={20} />
              </div>

              {/* Step label */}
              <p
                className={`mt-2 text-xs sm:text-sm font-medium ${
                  completed ? "text-green-700" : "text-gray-500"
                }`}
              >
                {step.label}
              </p>

              {/* Time */}
              {completed && (
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  <Clock className="inline w-3 h-3 mr-1" />
                  {new Date(order.updatedOn || order.createdOn).toLocaleDateString()}
                </p>
              )}

              {/* Connector line */}
              {idx < 3 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-[2px] ${
                    idx < currentStepIndex ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Order Info */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-3 text-lg">Order Information</h2>
        <div className="space-y-2 text-sm sm:text-base text-gray-700">
          <p>
            <span className="font-medium">Placed on:</span>{" "}
            {new Date(order.createdOn).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Payment:</span> {order.paymentMethod} (
            {order.paymentMode})
          </p>
          <p>
  <span className="font-medium">Total:</span> ₹
  {order?.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
</p>

        </div>
      </div>

      {/* Address */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-3 flex items-center text-lg">
          <MapPin className="w-5 h-5 mr-2 text-green-600" /> Shipping Address
        </h2>
      {Array.isArray(order?.address) && order.address.length > 0 && (
  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
    {order.address[0].name}, {order.address[0].houseNo}, {order.address[0].streetName},{" "}
    {order.address[0].city}, {order.address[0].district} - {order.address[0].pincode}
  </p>
)}

      </div>

      {/* Products */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="font-semibold mb-3 text-lg">Products</h2>
        <div className="divide-y">
      {Array.isArray(order?.products) && order.products.map((p) => (
  <div
    key={p.productId}
    className="flex flex-col sm:flex-row sm:items-center gap-4 py-4"
  >
    <img
      src={p.imageUrl}
      alt={p.productName}
      className="w-20 h-20 object-cover rounded-lg"
    />
    <div className="flex-1">
      <p className="font-medium text-sm sm:text-base">{p.productName}</p>
      <p className="text-xs sm:text-sm text-gray-500">
        Qty: {p.quantity} × ₹{p.price}
      </p>
    </div>
    <p className="font-semibold text-sm sm:text-base">
      ₹{(p.price || 0) * (p.quantity || 0)}
    </p>
  </div>
))}

        </div>
      </div>

      {/* Review Section */}
      {order.status === "DELIVERED" && (
        <div className="bg-white shadow rounded-xl p-5 mt-6">
          <h2 className="font-semibold mb-3 flex items-center text-lg">
            <Star className="w-5 h-5 mr-2 text-yellow-500" /> Leave a Review
          </h2>
          <textarea
            placeholder="Write your review..."
            className="w-full border rounded-lg p-3 mb-3 text-sm sm:text-base focus:outline-none focus:ring focus:ring-green-300"
          />
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base">
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;