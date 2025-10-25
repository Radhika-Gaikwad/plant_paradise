import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getProductsByCategory, getProductsBySubCategory } from "../../services/productApi";

const cachedProducts = JSON.parse(localStorage.getItem("cachedProducts") || "{}");

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ categoryId = null, subCategoryId = null } = {}, { getState, rejectWithValue }) => {
    try {
      const { cache } = getState().products;
      const key = subCategoryId || categoryId || "all";

      if (cache[key]) return { key, data: cache[key], fromCache: true };

      let data = [];
      if (subCategoryId) data = await getProductsBySubCategory(subCategoryId);
      else if (categoryId && categoryId !== "all") data = await getProductsByCategory(categoryId);
      else data = await getAllProducts();

      data = data.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

      return { key, data, fromCache: false };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

export const refreshProductsSilently = createAsyncThunk(
  "products/refreshSilently",
  async (_, { getState }) => {
    const current = getState().products.cache.all || [];
    const newData = await getAllProducts();
    const isDifferent = JSON.stringify(current) !== JSON.stringify(newData);
    if (isDifferent) {
      return { key: "all", data: newData.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)) };
    }
    return null;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: cachedProducts.all || [],
    cache: cachedProducts,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
  // only show loader if there’s no cached data
  if (!state.items || state.items.length === 0) {
    state.loading = true;
  }
  state.error = null;
})

      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { key, data, fromCache } = action.payload;
        state.items = data;
        state.loading = false;
        if (!fromCache) {
          state.cache[key] = data;
          localStorage.setItem("cachedProducts", JSON.stringify(state.cache));
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshProductsSilently.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.data;
          state.cache[action.payload.key] = action.payload.data;
          localStorage.setItem("cachedProducts", JSON.stringify(state.cache));
        }
      });
  },
});

export default productSlice.reducer;
