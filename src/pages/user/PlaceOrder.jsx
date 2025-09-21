// src/pages/PlaceOrder.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCart } from "../../services/cartService";
import { placeOrder } from "../../services/orderService";
import {
  getAllAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../services/profileApi";
import {
  FaPlus,
  FaEdit,
  FaMapMarkerAlt,
  FaPhone,
  FaTrash,
} from "react-icons/fa";

const PlaceOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderType, setOrderType] = useState("single");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    alterPhoneNo: "",
    houseNo: "",
    streetName: "",
    city: "",
    district: "",
    pincode: "",
    addressType: "Home",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const items = await getCart();
        setCartItems(items || []);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };

    const fetchAddresses = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const addr = await getAllAddresses(userId);
        setAddresses(addr || []);
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
    };

    fetchCart();
    fetchAddresses();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );
  const discount = cartItems.reduce(
    (acc, item) => acc + (item.price - item.finalPrice) * item.quantity,
    0
  );
  const deliveryCharge = subtotal === 0 || subtotal > 999 ? 0 : 49;
  const total = subtotal + deliveryCharge;

   // ✅ UPDATED confirmOrder
  const confirmOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty ❌");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select a delivery address ❌");
      return;
    }

    try {
      if (paymentMethod === "online") {
        // Step 1: Create payment order
        const paymentOrder = await createPaymentOrder(total);

        // Step 2: Razorpay Checkout
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: paymentOrder.amount,
          currency: paymentOrder.currency,
          order_id: paymentOrder.id,
          handler: async (response) => {
            // Step 3: Verify payment
            const verify = await verifyPaymentOrder(response);
            if (verify.success) {
              await placeOrder({
                items: cartItems,
                address: selectedAddress,
                total,
                orderType,
                paymentMethod: "online",
                paymentMode: "paid",
              });
              toast.success("Order placed successfully ✅");
              navigate("/orders");
            } else {
              toast.error("Payment verification failed ❌");
            }
          },
          prefill: {
            name: selectedAddress.name,
            contact: selectedAddress.phoneNo,
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // COD Order
        await placeOrder({
          items: cartItems,
          address: selectedAddress,
          total,
          orderType,
          paymentMethod: "cod",
          paymentMode: "pending",
        });
        toast.success("Order placed successfully ✅");
        navigate("/orders");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order ❌");
      console.error(err);
    }
  };

  /*const confirmOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty ❌");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select a delivery address ❌");
      return;
    }

    try {
      await placeOrder({
        items: cartItems,
        address: selectedAddress,
        total,
        orderType,
        paymentMethod,
      });
      toast.success("Order placed successfully ✅");
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order ❌");
      console.error(err);
    }
  };*/

  const handleAddEdit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      // Optional validation
      if (!formData.name || !formData.phoneNo || !formData.houseNo || !formData.city) {
        toast.error("Please fill all required fields ❌");
        return;
      }

      if (editingAddress) {
        await updateAddress(userId, editingAddress._id, formData);
        toast.success("Address updated ✅");
      } else {
        await addAddress(userId, formData);
        toast.success("Address added ✅");
      }

      const updated = await getAllAddresses(userId);
      setAddresses(updated || []);

      // Reset modal and form
      setShowModal(false);
      setEditingAddress(null);
      setFormData({
        name: "",
        phoneNo: "",
        alterPhoneNo: "",
        houseNo: "",
        streetName: "",
        city: "",
        district: "",
        pincode: "",
        addressType: "Home",
      });
    } catch (err) {
      toast.error("Failed to save address ❌");
      console.error(err);
    }
  };

  const handleDelete = async (addrId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      const userId = localStorage.getItem("userId");
      await deleteAddress(userId, addrId);
      toast.success("Address deleted ✅");

      const updated = await getAllAddresses(userId);
      setAddresses(updated || []);

      if (selectedAddress?._id === addrId) setSelectedAddress(null);
    } catch (err) {
      toast.error("Failed to delete address ❌");
      console.error(err);
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4 lg:px-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Secure Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Info */}
            <div className="border rounded-lg p-5 shadow-sm bg-green-50 relative">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-green-700">
                  <FaMapMarkerAlt /> Delivery Address
                </h2>
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setFormData({
                      name: "",
                      phoneNo: "",
                      alterPhoneNo: "",
                      houseNo: "",
                      streetName: "",
                      city: "",
                      district: "",
                      pincode: "",
                      addressType: "Home",
                    });
                    setShowModal(true);
                  }}
                  className="absolute top-5 right-5 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 shadow"
                >
                  <FaPlus /> Add New Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                {addresses.map((addr) => (
                  <div
                    key={addr._id}
                    className={`relative p-4 border rounded-lg shadow cursor-pointer transition ${
                      selectedAddress?._id === addr._id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 bg-white hover:shadow-md"
                    }`}
                    onClick={() => setSelectedAddress(addr)}
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {addr.name} ({addr.addressType || "Home"})
                      </p>
                      <p className="text-gray-700">
                        {addr.houseNo}, {addr.streetName}
                      </p>
                      <p className="text-gray-700">
                        {addr.city}, {addr.district} - {addr.pincode}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <FaPhone className="text-green-600" /> {addr.phoneNo}
                        {addr.alterPhoneNo && ` | Alt: ${addr.alterPhoneNo}`}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAddress(addr);
                          setFormData({
                            name: addr.name,
                            phoneNo: addr.phoneNo,
                            alterPhoneNo: addr.alterPhoneNo || "",
                            houseNo: addr.houseNo,
                            streetName: addr.streetName,
                            city: addr.city,
                            district: addr.district,
                            pincode: addr.pincode,
                            addressType: addr.addressType || "Home",
                          });
                          setShowModal(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(addr._id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="border rounded-lg p-5 shadow-sm bg-green-50">
              <h2 className="text-lg font-semibold mb-3 text-green-700">
                Apply Coupon
              </h2>
              <p className="text-sm text-gray-600">
                No available coupons right now
              </p>
            </div>

            {/* Order Type */}
            <div className="border rounded-lg p-5 shadow-sm bg-green-50">
              <h2 className="text-lg font-semibold mb-3 text-green-700">
                Order Type
              </h2>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    value="single"
                    checked={orderType === "single"}
                    onChange={() => setOrderType("single")}
                  />
                  Single Order
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    value="subscription"
                    checked={orderType === "subscription"}
                    onChange={() => setOrderType("subscription")}
                  />
                  Subscription
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border rounded-lg p-5 shadow-sm bg-green-50">
              <h2 className="text-lg font-semibold mb-3 text-green-700">
                Payment Method
              </h2>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  Online Payment
                </label>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="border rounded-lg shadow-md p-6 h-fit bg-gray-50">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/60"}
                      alt={item.productName}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-green-700">
                    ₹{item.finalPrice * item.quantity}
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
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={confirmOrder}
              disabled={!selectedAddress}
              className={`w-full mt-6 py-3 rounded-lg font-medium transition ${
                selectedAddress
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>

            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <select
              className="w-full border rounded p-2 mb-2"
              value={formData.addressType}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, addressType: e.target.value }))
              }
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>

            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="House No"
              value={formData.houseNo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, houseNo: e.target.value }))
              }
            />
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="Street Name"
              value={formData.streetName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, streetName: e.target.value }))
              }
            />
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
            />
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="District"
              value={formData.district}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, district: e.target.value }))
              }
            />
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, pincode: e.target.value }))
              }
            />
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="Phone No"
              value={formData.phoneNo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phoneNo: e.target.value }))
              }
            />
            <input
              type="text"
              className="w-full border rounded p-2 mb-3"
              placeholder="Alternate Phone No (Optional)"
              value={formData.alterPhoneNo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, alterPhoneNo: e.target.value }))
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingAddress(null);
                  setFormData({
                    name: "",
                    phoneNo: "",
                    alterPhoneNo: "",
                    houseNo: "",
                    streetName: "",
                    city: "",
                    district: "",
                    pincode: "",
                    addressType: "Home",
                  });
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEdit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
