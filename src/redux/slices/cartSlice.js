// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, addToCart, updateCart, removeFromCart } from "../../services/cartService";

// ✅ Fetch all cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCart();
      return data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);

// ✅ Add item to cart
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const data = await addToCart(productId, quantity);
      window.dispatchEvent(new Event("cartUpdated"));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item");
    }
  }
);

// ✅ Update item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await updateCart(productId, quantity);
      window.dispatchEvent(new Event("cartUpdated"));
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update quantity");
    }
  }
);

// ✅ Remove item
export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      await removeFromCart(productId);
      window.dispatchEvent(new Event("cartUpdated"));
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove item");
    }
  }
);

// 🧠 Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🛒 Fetch
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ Add
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
      })

      // 🔄 Update
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const existing = state.items.find((item) => item.productId === productId);
        if (existing) existing.quantity = quantity;
      })

      // ❌ Remove
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      });
  },
});

export default cartSlice.reducer;
