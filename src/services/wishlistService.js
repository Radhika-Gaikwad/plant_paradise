import axiosInstance from "../utils/axios/axiosInstance";

// ✅ Get wishlist
export const getWishlist = async () => {
  const { data } = await axiosInstance.get("/wishlist");
  return data;
};

// ✅ Add to wishlist
export const addToWishlist = async (productId) => {
  const { data } = await axiosInstance.post("/wishlist/add", { productId });
  return data;
};

// ✅ Remove from wishlist
export const removeFromWishlist = async (productId) => {
  const { data } = await axiosInstance.delete(`/wishlist/remove/${productId}`);
  return data;
};
