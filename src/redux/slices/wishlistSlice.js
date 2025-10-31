import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlist, addToWishlist, removeFromWishlist } from "../../services/wishlistService";

// 🧠 Helper to load and save localStorage
const loadWishlistFromStorage = () => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load wishlist from storage", err);
    return [];
  }
};

const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save wishlist to storage", err);
  }
};

// ✅ Fetch all wishlist items from backend
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getWishlist();
      // some APIs return {data: [...]}, handle both
      return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch wishlist");
    }
  }
);

// ✅ Add product to wishlist
export const addItemToWishlist = createAsyncThunk(
  "wishlist/addItem",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await addToWishlist(productId);
      window.dispatchEvent(new Event("wishlistUpdated"));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to wishlist");
    }
  }
);

export const removeItemFromWishlist = createAsyncThunk(
  "wishlist/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      const updatedWishlist = await removeFromWishlist(productId);
      window.dispatchEvent(new Event("wishlistUpdated"));
      return { productId, updatedWishlist };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove from wishlist");
    }
  }
);


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlistFromStorage(), // 🌟 Load from localStorage on startup
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist(state) {
      state.items = [];
      saveWishlistToStorage([]); // clear cache
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟢 FETCH
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        saveWishlistToStorage(state.items); // ✅ update cache
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟡 ADD
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        const exists = state.items.some(
          (item) => item.productId === action.payload.productId
        );
        if (!exists) {
          state.items.push(action.payload);
          saveWishlistToStorage(state.items);
        }
      })
      .addCase(addItemToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })

     .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
  const { productId, updatedWishlist } = action.payload;
  console.log("🗑 Removing from wishlist:", productId);

  // If backend returns updated list (array of product IDs)
  if (Array.isArray(updatedWishlist)) {
    // Option 1: Keep only items still in the updatedWishlist
    state.items = state.items.filter((item) =>
      updatedWishlist.includes(item.productId)
    );
  } else {
    // Option 2: fallback - just remove one item locally
    state.items = state.items.filter((item) => item.productId !== productId);
  }

  saveWishlistToStorage(state.items);
})


  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
