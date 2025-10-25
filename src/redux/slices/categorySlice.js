import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories, getAllSubCategories } from "../../services/categoryService";

export const fetchAllCategories = createAsyncThunk("categories/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const categories = await getAllCategories();
    const allOption = {
      _id: "all",
      categoryId: "all",
      categoryName: "All Plants",
      imageUrl: "https://t4.ftcdn.net/jpg/09/01/66/49/360_F_901664916_4aDMt51PpSI1LyvTdd8mAcbr73kWivsm.jpg",
    };
    const finalCategories = [allOption, ...categories];
    localStorage.setItem("cachedCategories", JSON.stringify(finalCategories));
    return finalCategories;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to fetch categories.");
  }
});

export const fetchAllSubCategories = createAsyncThunk("categories/fetchSubCategories", async (_, { rejectWithValue }) => {
  try {
    const subCategories = await getAllSubCategories();
    localStorage.setItem("cachedSubCategories", JSON.stringify(subCategories));
    return subCategories;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to fetch subcategories.");
  }
});

const cachedCategories = JSON.parse(localStorage.getItem("cachedCategories") || "[]");
const cachedSubCategories = JSON.parse(localStorage.getItem("cachedSubCategories") || "[]");

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: cachedCategories,
    subCategories: cachedSubCategories,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(fetchAllCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAllSubCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllSubCategories.fulfilled, (state, action) => { state.loading = false; state.subCategories = action.payload; })
      .addCase(fetchAllSubCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default categorySlice.reducer;
