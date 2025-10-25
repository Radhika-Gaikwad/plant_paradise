import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlist } from "../../services/wishlistService";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (_, { getState }) => {
  const { cache } = getState().wishlist;
  if (cache) return { data: cache, fromCache: true };

  const data = await getWishlist();
  return { data, fromCache: false };
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    cache: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        if (!action.payload.fromCache) state.cache = action.payload.data;
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default wishlistSlice.reducer;
