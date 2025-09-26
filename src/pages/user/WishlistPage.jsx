import React, { useEffect, useState } from "react";
import PlantCard from "../../components/ui/PlantCard";
import { getWishlist } from "../../services/wishlistService";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getWishlist();
      const items = Array.isArray(res?.wishlist) ? res.wishlist : res.data?.data || [];
      setWishlist(items);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      toast.error("Failed to load wishlist");
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();

    // Listen for global wishlist updates from PlantCard or other components
    const handler = () => fetchWishlist();
    window.addEventListener("wishlistUpdated", handler);

    return () => window.removeEventListener("wishlistUpdated", handler);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading wishlist...</p>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
        🌿 My Wishlist ({wishlist.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((plant) => (
          <PlantCard key={plant.productId} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
