// redux/signupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupService } from "./signupService";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await signupService(formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Signup failed");
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetSignup: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
