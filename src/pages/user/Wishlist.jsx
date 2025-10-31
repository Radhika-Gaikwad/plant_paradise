import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PlantCard from "../../components/ui/PlantCard";
import { getWishlist } from "../../services/wishlistService";
//import { showToast } from "../../utils/showToast";
import { getProductById } from "../../services/productApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";
import WishlistShimmer from "../../components/shimmers/WishlistShimmer";

const Wishlist = () => {
  //const [wishlist, setWishlist] = useState([]);
  //const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { items, loading } = useSelector((state) => state.wishlist);
  const { items: wishlist, loading } = useSelector((state) => state.wishlist);
  const [detailedWishlist, setDetailedWishlist] = useState([]);
  /*const fetchWishlistData = async () => {
  try {
    const data = await getWishlist();

    // fetch full product details for each wishlist item
    const detailedWishlist = await Promise.all(
      (data || []).map(async (item) => {
        const product = await getProductById(item.productId);
        return product; // full product object with price, rating, etc.
      })
    );

    setWishlist(detailedWishlist);
  } catch (err) {
    showToast("Failed to fetch wishlist", "error");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchWishlistData();
  }, []);*/

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
  const fetchDetails = async () => {
    if (!wishlist || wishlist.length === 0) {
      setDetailedWishlist([]);
      return;
    }

    const details = await Promise.all(
      wishlist.map(async (item) => {
        const product = await getProductById(item.productId);
        return product;
      })
    );
    setDetailedWishlist(details);
  };

  fetchDetails();
}, [wishlist]);



  if (loading) return <WishlistShimmer/>;

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
          Wishlist ({detailedWishlist.length})
        </h2>
      </div>

      {detailedWishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {detailedWishlist.map((plant) => (
           <PlantCard key={plant._id} plant={plant} />
          ))}

        </div>
      )}
    </div>
  );
};

export default Wishlist;