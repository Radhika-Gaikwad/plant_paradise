import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PlantCard from "../../components/ui/PlantCard";
import { getWishlist } from "../../services/wishlistService";
import { showToast } from "../../utils/showToast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishlistData = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data || []);
    } catch (err) {
      showToast("Failed to fetch wishlist", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  if (loading) return <p className="text-center py-6">Loading wishlist...</p>;

  return (
    <div className="p-6">
      {/* Back Button & Title */}
      <div className="flex items-center mb-6 space-x-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 transition text-lg"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-medium text-gray-800">
          Wishlist ({wishlist.length})
        </h2>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((plant) => (
            <PlantCard key={plant.productId} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
