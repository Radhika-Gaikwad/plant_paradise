// AdminOrderDetails.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Loader2,
} from "lucide-react";
import OrderService from "../../services/orderAdmin";
import { showToast } from "../../utils/showToast"; 
const STATUS_OPTIONS = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERYPARTNERASSIGNED",
  "OUTFORDELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const AdminOrderDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(state?.order);
  console.log("OrderDetails Render", orderId, order);

 useEffect(() => {
    if (!order && orderId) {
      const fetchOrder = async () => {
        try {
          setLoading(true);
          const fetchedOrder = await OrderService.getOrderById(orderId);
          setOrder(fetchedOrder);
        } catch (err) {
          setError(err?.message || "Failed to fetch order");
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [order, orderId]);

  if (loading && !order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Loading order details...
      </div>
    );
  }


  // Status color mapping
  const statusColors = {
    PLACED: "bg-blue-100 text-blue-700",
    CONFIRMED: "bg-indigo-100 text-indigo-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERYPARTNERASSIGNED: "bg-orange-100 text-orange-700",
    OUTFORDELIVERY: "bg-teal-100 text-teal-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

const handleStatusChange = async (newStatus) => {
    if (!newStatus || order.status === newStatus) return;

    try {
      setLoading(true);
      await OrderService.updateOrderStatus(order.orderId, {
        status: newStatus,
      });
      setOrder({ ...order, status: newStatus });
      showToast(`Order status updated to ${newStatus}`, "success");
    } catch (err) {
      showToast(err?.message || "Failed to update status", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminCancel = async () => {
    try {
      setLoading(true);
      await OrderService.adminCancelOrder(order.orderId);
      setOrder({ ...order, status: "CANCELLED" });
      showToast(`Order ${order.orderId} cancelled successfully`, "success");
    } catch (err) {
      showToast(err?.message || "Failed to cancel order", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await OrderService.deleteOrder(order.orderId);
      showToast("Order deleted successfully", "success");
      navigate(-1);
    } catch (err) {
      showToast(err?.message || "Failed to delete order", "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 h-5 w-5" /> Back
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-2xl p-2 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-md  text-sm font-bold text-gray-800">
            Order #{order.orderId}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[order.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {order.status}
          </span>
        </div>
        <p className="text-gray-500 mt-2">
          Created On: {new Date(order.createdOn).toLocaleString()}
        </p>
      </div>

      {/* Customer + Payment */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Info</h2>
          <p>
            <strong>Name:</strong> {order.userName}
          </p>
          <p>
            <strong>Email:</strong> {order.userEmail}
          </p>
          {order.address?.[0] && (
            <div className="mt-3">
              <p>
                <strong>Phone:</strong> {order.address[0].phoneNo}
              </p>
              <p>
                <strong>Address:</strong> {order.address[0].name},{" "}
                {order.address[0].city} - {order.address[0].pincode}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Info</h2>
          {order.paymentHistory?.[0] ? (
            <>
              <p>
                <strong>Method:</strong>{" "}
                {order.paymentHistory[0].paymentMethod}
              </p>
              <p>
                <strong>Payment ID:</strong> {order.paymentHistory[0].paymentId}
              </p>
              <p>
                <strong>Status:</strong> {order.paymentHistory[0].status}
              </p>
              <p>
                <strong>Amount:</strong> ₹{order.paymentHistory[0].amount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  order.paymentHistory[0].paymentDate
                ).toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No payment records.</p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
                <th className="p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.products?.map((p, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{p.productName}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2 text-center">{p.quantity}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2 font-medium">₹{p.price * p.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t font-semibold">
                <td colSpan={4} className="p-2 text-right">
                  Total
                </td>
                <td className="p-2">₹{order.totalPrice}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
        {order.statusHistory?.length > 0 ? (
          <ul className="space-y-3">
            {order.statusHistory.map((s, idx) => (
              <li key={idx} className="flex items-center text-sm">
                {s.status === "PLACED" && (
                  <Clock className="text-blue-500 mr-2 h-4 w-4" />
                )}
                {s.status === "DELIVERED" && (
                  <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                )}
                {s.status === "CANCELLED" && (
                  <XCircle className="text-red-500 mr-2 h-4 w-4" />
                )}
                <span className="font-medium">{s.status}</span>
                <span className="ml-2 text-gray-500">
                  {new Date(s.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No status history available.</p>
        )}
      </div>

      {/* Actions */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Manage Order</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <select
            value={order.status || ""}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={handleAdminCancel}
            disabled={loading}
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
            Cancel Order
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-black disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
