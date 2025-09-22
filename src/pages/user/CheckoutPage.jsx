// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProcessingPopup from "../../components/ui/ProcessingPopup";
import {
  getUserAddresses,
  deleteUserAddress,
} from "../../services/addressService";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import {
  createPaymentOrder,
  verifyPaymentOrder,
  placeOrder,
} from "../../services/orderService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PaymentPopup from "../../components/ui/PaymentPopup";
import { showToast } from "../../utils/showToast";


const currency = (v) => `₹${v?.toLocaleString?.() ?? v}`;

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();


  const {
    cartItems = [],
    subtotal = 0,
    totalDiscount = 0,
    deliveryCharge = 0,
    grandTotal = 0,
  } = location.state || {};

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [items, setItems] = useState(cartItems);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [processingStep, setProcessingStep] = useState(null);
  // fetch addresses
  useEffect(() => {
    async function fetchAddresses() {
      const data = await getUserAddresses();
      setAddresses(data);
      if (data.length > 0) setSelectedAddress(data[0]._id);
    }
    fetchAddresses();
  }, []);

  const handleQtyChange = (productId, newQty) => {
    setItems((prev) =>
      prev.map((it) => (it.productId === productId ? { ...it, quantity: newQty } : it))
    );
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteUserAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      if (selectedAddress === id) setSelectedAddress(addresses[0]?._id ?? null);
    } catch (e) {
      // error toast handled in service
    }
  };


  // inside CheckoutPage component (replace existing helpers)

  const buildProductsPayload = (itemsList) => {
    // Convert whatever shape you have into [{ productId, quantity }]
    return itemsList.map((it) => {
      // find product id (many possible shapes)
      const productId =
        it.productId ??
        it._id ??
        it.product?._id ??
        it.product?.productId ??
        it.product?.id ??
        null;

      // find cart quantity (prefer quantity from cart, not product.available stock)
      const quantity = Number(
        it.quantity ?? it.qty ?? it.cartQuantity ?? it.count ?? it.quantityInCart ?? 0
      );

      return { productId, quantity, raw: it };
    });
  };

  const extractOrderIdFromResponse = (res) => {
    // order service returns 'data' object (see orderService), try common fields
    if (!res) return null;
    return (
      res.orderId ||
      res.order?.orderId ||
      res._id ||
      res.data?.orderId ||
      res.data?.order?.orderId ||
      null
    );
  };

  const handlePayOnline = async (method) => {
    try {
      // quick validations
      if (!selectedAddress) {
        toast.error("Please select a delivery address");
        return;
      }
      if (!items || items.length === 0) {
        toast.errort("Your cart is empty");
        return;
      }

      // Build normalized products payload
      const mapped = buildProductsPayload(items);
      // validate productId and quantity
      const bad = mapped.find((p) => !p.productId || p.quantity <= 0);
      if (bad) {
        toast.error("One or more cart items are invalid. Please refresh your cart.");
        return;
      }

      // optional: client-side stock check (if product objects include stock/availableStock)
      const stockIssue = mapped.find((p) => {
        const raw = p.raw;
        const available =
          raw.availableStock ?? raw.stock ?? raw.inventory ?? raw.qtyAvailable ?? null;
        return available !== null && typeof available === "number" && p.quantity > available;
      });
      if (stockIssue) {
        const name = stockIssue.raw.productName ?? stockIssue.raw.name ?? "One item";
        toast.error(`${name} does not have enough stock. Reduce quantity.`);
        return;
      }

      // STEP 1: Create payment order on backend
      setProcessingStep("initiating");
      const paymentInit = await createPaymentOrder(updatedGrandTotal);
      if (!paymentInit?.clientPayload) {
        throw new Error("Payment initialization failed");
      }

      // STEP 2: Verifying
      setProcessingStep("verifying");
      const verifyPayload = {
        clientPayload: {
          paymentId: paymentInit.clientPayload.paymentId,
          orderId: paymentInit.clientPayload.orderId,
          amount: paymentInit.clientPayload.amount,
          currency: paymentInit.clientPayload.currency,
          receipt: paymentInit.clientPayload.receipt,
        },
        signature: paymentInit.serverSignature,
      };
      const verifyRes = await verifyPaymentOrder(verifyPayload);
      if (!verifyRes?.success) {
        // backend sends a helpful message usually
        const msg = verifyRes?.message || "Payment verification failed";
        throw new Error(msg);
      }

      // STEP 3: Placing order
      setProcessingStep("placing");
      const selectedAddrObj = addresses.find((a) => a._id === selectedAddress);
      if (!selectedAddrObj) throw new Error("No address selected");

      const productsForOrder = mapped.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      }));

      const orderBody = {
        user: {
          email: "radhikag.1357@gmail.com",
          username: "Radhika Gaikwad",
        },
        products: productsForOrder,
        address: {
          name: selectedAddrObj.name,
          phoneNo: selectedAddrObj.phoneNo,
          city: selectedAddrObj.city,
          pincode: selectedAddrObj.pincode,
        },
        paymentMode: "ONLINE",
        paymentMethod: method,
        paymentPayload: paymentInit.clientPayload,
        paymentSignature: paymentInit.serverSignature,
        // optionally include a client-side order summary to help backend logs:
        clientSummary: {
          subtotal: updatedSubtotal,
          deliveryCharge,
          grandTotal: updatedGrandTotal,
        },
      };

      const placeRes = await placeOrder(orderBody);

      // success => clear processing and show success
      setProcessingStep(null);
      navigate("/orders")
      const orderId = placeRes?.orderId || extractOrderIdFromResponse(placeRes);
      if (orderId) {
        navigate(`/orders/${orderId}`);
      } else {
        navigate("/orders"); // fallback if no id
      }
    } catch (err) {
      console.error("Payment failed:", err);
      setProcessingStep(null);

      // show error from backend if available
      const message =
        err?.response?.data?.message ?? err?.message ?? "Payment / Order failed. Please try again.";
      toast.error(message);
    }
  };


  const handleCOD = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select a delivery address");
        return;
      }
      if (!items || items.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const mapped = buildProductsPayload(items);
      const bad = mapped.find((p) => !p.productId || p.quantity <= 0);
      if (bad) {
        toast.error("One or more cart items are invalid. Please refresh your cart.");
        return;
      }

      // optional stock check
      const stockIssue = mapped.find((p) => {
        const raw = p.raw;
        const available =
          raw.availableStock ?? raw.stock ?? raw.inventory ?? raw.qtyAvailable ?? null;
        return available !== null && typeof available === "number" && p.quantity > available;
      });
      if (stockIssue) {
        const name = stockIssue.raw.productName ?? stockIssue.raw.name ?? "One item";
        toast.error(`${name} does not have enough stock. Reduce quantity.`);
        return;
      }

      setProcessingStep("placing");
      const selectedAddrObj = addresses.find((a) => a._id === selectedAddress);

      const productsForOrder = mapped.map((p) => ({ productId: p.productId, quantity: p.quantity }));

      const orderBody = {
        user: { email: "radhikag.1357@gmail.com", username: "Radhika Gaikwad" },
        products: productsForOrder,
        address: {
          name: selectedAddrObj.name,
          phoneNo: selectedAddrObj.phoneNo,
          city: selectedAddrObj.city,
          pincode: selectedAddrObj.pincode,
        },
        paymentMode: "COD",
      };

      const placeRes = await placeOrder(orderBody);

      setProcessingStep(null);
      navigate("/orders")
      const orderId = extractOrderIdFromResponse(placeRes);
      if (orderId) {
        navigate(`/orders/${orderId}`);
      } else {
        navigate("/orders");
      }
    } catch (err) {
      console.error("COD create failed:", err);
      setProcessingStep(null);
      const message =
        err?.response?.data?.message ?? err?.message ?? "COD order failed. Please try again.";
      toast.error(message);
    }
  };

  // Navigate to Address page for add / edit
  const goToAddAddress = () => {
    navigate("/addresses", { state: { from: "checkout", mode: "add" } });
  };
  const goToEditAddress = (addr) => {
    navigate("/addresses", { state: { from: "checkout", mode: "edit", address: addr } });
  };

  const totalItems = items.reduce((s, it) => s + it.quantity, 0);
  const updatedSubtotal = items.reduce((s, it) => s + it.finalPrice * it.quantity, 0);
  const updatedDiscount = items.reduce((s, it) => s + (it.price - it.finalPrice) * it.quantity, 0);
  const updatedGrandTotal = updatedSubtotal + deliveryCharge;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[calc(100vh-100px)] md:h-[calc(100vh-100px)]">
      {/* Left */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2 h-full">
        <h1 className="text-3xl font-extrabold">Checkout</h1>

        {/* Addresses */}
        <div className="p-5 border rounded-2xl bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Select Delivery Address</h3>
            <button
              onClick={goToAddAddress}
              className="flex items-center gap-2 text-green-600 font-medium hover:underline"
            >
              <FaPlus /> Add New
            </button>
          </div>

          {addresses.length === 0 ? (
            <p className="text-gray-500">No saved addresses.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  className={`relative p-4 border rounded-xl cursor-pointer transition ${selectedAddress === addr._id ? "border-green-600 bg-green-50" : "border-gray-300"
                    }`}
                  onClick={() => setSelectedAddress(addr._id)}
                >
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToEditAddress(addr);
                      }}
                      className="p-1 rounded-md hover:bg-gray-200"
                      title="Edit"
                    >
                      <FaEdit className="text-blue-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Remove this address?")) handleDeleteAddress(addr._id);
                      }}
                      className="p-1 rounded-md hover:bg-gray-200"
                      title="Delete"
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </div>

                  <input type="radio" name="address" value={addr._id} checked={selectedAddress === addr._id} readOnly className="mr-2" />
                  <span className="font-medium">{addr.name}</span>
                  <p className="text-sm text-gray-600">
                    {addr.houseNo}, {addr.streetName}, {addr.city}, {addr.district} - {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">📞 {addr.phoneNo} | {addr.addressType}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Items */}
        <div className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
          <h3 className="text-lg font-semibold mb-3">Order Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col md:flex-row items-center md:items-start gap-4 p-3 border rounded-xl h-auto md:h-full"
              >
                <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.productName}</h4>
                  <p className="text-sm text-gray-500">{currency(item.finalPrice)} each</p>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="text-sm">Qty:</label>
                    <select
                      value={item.quantity}
                      onChange={(e) => handleQtyChange(item.productId, parseInt(e.target.value))}
                      className="border rounded-md px-2 py-1"
                    >
                      {[...Array(10).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="font-semibold">{currency(item.finalPrice * item.quantity)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <aside className="lg:col-span-1 space-y-3 h-full flex flex-col">
        <div className="p-3 border rounded-2xl bg-white shadow-sm flex-1">
          <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
          <div className="flex justify-between text-gray-600">
            <span>Items ({totalItems})</span>
            <span>{currency(updatedSubtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-1">
            <span>Discount</span>
            <span>-{currency(updatedDiscount)}</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-1">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? "Free" : currency(deliveryCharge)}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>{currency(updatedGrandTotal)}</span>
          </div>

          <button onClick={() => setShowPaymentOptions(true)} className="mt-4 w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold shadow">
            Place Order
          </button>

          {showPaymentOptions && (
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setShowPaymentPopup(true)}

                className="w-full px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                Pay Online
              </button>
              <button
                onClick={handleCOD}
                className="w-full px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                Cash on Delivery
              </button>
            </div>
          )}

        </div>

        {/* Extra Info */}
        <div className="p-2 border rounded-2xl bg-white shadow-sm space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <span className="text-green-600 text-xl">🔒</span>
            <div>
              <div className="font-semibold">100% Secure Payments</div>
              <div>Encrypted and safe checkout.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl">↩️</span>
            <div>
              <div className="font-semibold">7-day Returns</div>
              <div>Return within 7 days of delivery.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-orange-500 text-xl">🚚</span>
            <div>
              <div className="font-semibold">Fast Delivery</div>
              <div>Most orders delivered in 3–5 business days.</div>
            </div>
          </div>
        </div>
      </aside>
      {showPaymentPopup && (
        <PaymentPopup
          amount={updatedGrandTotal}
          onClose={() => setShowPaymentPopup(false)}
          onConfirm={async (method) => {
            setShowPaymentPopup(false);
            await handlePayOnline(method);
          }}
        />
      )}

      {processingStep === "verifying" && (
        <ProcessingPopup message="Verifying Payment..." />
      )}

      {processingStep === "placing" && (
        <ProcessingPopup message="Placing Your Order..." />
      )}


    </div>
  );
}