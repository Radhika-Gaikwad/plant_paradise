import React, { useEffect, useState } from "react";
import { FaHeart, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCart,
  removeFromCart,
  addToCart,
} from "../../services/cartService"; // adjust path if needed
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  addItemToCart,
} from "../../redux/slices/cartSlice";
import CartShimmer from "../../components/shimmers/CartShimmer";

// CartPage.jsx
// - Responsive, modern cart layout for Plant Paradise
// - Uses Tailwind classes (no external CSS required)
// - Expects the service functions (getCart, updateCart, removeFromCart, addToCart)
// - Replace toast/notification with your project's helpers if needed

//const currency = (v) => `₹${v.toLocaleString()}`;
const currency = (v) => `₹${(v ?? 0).toLocaleString("en-IN")}`;

export default function CartPage() {
  //const [items, setItems] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  /*useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart(); // returns array (as provided in your API wrapper)
      setItems(data || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };*/
    useEffect(() => {
    dispatch(fetchCartItems());
    }, [dispatch]);

  /*const changeQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      setUpdating(true);
      await updateCart(productId, newQty);
      setItems((prev) =>
        prev.map((it) => (it.productId === productId ? { ...it, quantity: newQty } : it))
      );
    } catch (err) {
      console.error("update failed", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      setUpdating(true);
      await removeFromCart(productId);
      setItems((prev) => prev.filter((p) => p.productId !== productId));
    } catch (err) {
      console.error("remove failed", err);
    } finally {
      setUpdating(false);
    }
  };
  
    const changeQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      setUpdating(true);
      await updateCart(productId, newQty);
      setItems((prev) =>
        prev.map((it) => (it.productId === productId ? { ...it, quantity: newQty } : it))
      );
      window.dispatchEvent(new Event("cartUpdated")); // 🔔 notify header
    } catch (err) {
      console.error("update failed", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      setUpdating(true);
      await removeFromCart(productId);
      setItems((prev) => prev.filter((p) => p.productId !== productId));
      window.dispatchEvent(new Event("cartUpdated")); // 🔔 notify header
    } catch (err) {
      console.error("remove failed", err);
    } finally {
      setUpdating(false);
    }
  };*/
  const changeQuantity = (productId, newQty) => {
  if (newQty < 1) return;
  dispatch(updateCartItem({ productId, quantity: newQty }));
};
  
const handleRemove = (productId) => {
  dispatch(removeCartItem(productId));
};



  /*const handleBuyNow = async (product) => {
    // For Buy Now we'll add single product to a temporary checkout or navigate to checkout
    // Implementation depends on your flow — here we add item to cart (ensure qty 1) then go to /checkout
    try {
      await addToCart(product.productId, 1);
      navigate("/checkout", { state: { buyNow: true, productId: product.productId } });
    } catch (err) {
      console.error("buy now error", err);
    }
  };*/
  const handleBuyNow = (product) => {
  dispatch(addItemToCart({ productId: product.productId, quantity: 1 }));
  navigate("/checkout", { state: { buyNow: true, productId: product.productId } });
};


  const subtotal = items.reduce((s, it) => s + it.finalPrice * it.quantity, 0);
  const totalDiscount = items.reduce((s, it) => s + (it.price - it.finalPrice) * it.quantity, 0);
  const deliveryCharge = subtotal > 999 || subtotal === 0 ? 0 : 49; // example rule
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6">Your Cart</h1>

      {loading ? (
         <CartShimmer />
      ) : items.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4">Looks like you haven’t added any plants yet.</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: product list (span 2 cols on large) */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-2xl shadow-sm bg-white"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-full sm:w-36 h-28 object-cover rounded-lg"
                  />

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{item.productName}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                          <span className="font-medium">{item.overAllRating}⭐</span>
                          <span>• {item.categoryName}</span>
                          <span>• {item.unit}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-500 line-through">{currency(item.price)}</div>
                        <div className="text-xl font-bold">{currency(item.finalPrice)}</div>
                        {item.discount ? (
                          <div className="text-xs text-green-700 font-semibold">{item.discount}% OFF</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div className="inline-flex items-center rounded-2xl border overflow-hidden">
                        <button
                          disabled={updating}
                          onClick={() => changeQuantity(item.productId, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-gray-100"
                        >
                          <FaMinus />
                        </button>
                        <div className="px-4 py-2 min-w-[48px] text-center">{item.quantity}</div>
                        <button
                          disabled={updating}
                          onClick={() => changeQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-100"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBuyNow(item)}
                          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl font-medium shadow"
                        >
                          Buy Now
                        </button>

                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="px-4 py-2 border rounded-xl flex items-center gap-2 text-red-600"
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: order summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="p-5 border rounded-2xl bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{currency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mt-1">
                  <span>Discount</span>
                  <span>-{currency(totalDiscount)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mt-1">
                  <span>Delivery</span>
                  <span>{deliveryCharge === 0 ? "Free" : currency(deliveryCharge)}</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>{currency(grandTotal)}</span>
                </div>

               <button
  onClick={() =>
    navigate("/checkout", {
      state: {
        cartItems: items,
        subtotal,
        totalDiscount,
        deliveryCharge,
        grandTotal,
      },
    })
  }
  className="mt-4 w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-2xl text-white font-semibold shadow"
>
  Proceed to Checkout
</button>


                <button
                  onClick={() => navigate("/categories")}
                  className="mt-3 w-full px-4 py-3 border rounded-2xl text-gray-700 font-medium"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="p-4 text-sm text-gray-600 border rounded-2xl bg-gray-50">
                <p className="mb-1">Need help? Contact our support or call +91 90000 00000</p>
                <p className="text-xs">All purchases are protected by our 7-day return policy.</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}