import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart } from "../../services/cartService";

export const fetchCart = createAsyncThunk("cart/fetch", async (_, { getState }) => {
  const { cache } = getState().cart;
  if (cache) return { data: cache, fromCache: true };

  const data = await getCart();
  return { data, fromCache: false };
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cache: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        if (!action.payload.fromCache) state.cache = action.payload.data;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
