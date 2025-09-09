/*// src/features/authentication/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./authService";
import { signUp } from "./authService"; // ✅ we’ll create this

// Login thunk (already exists)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      return await login(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Signup thunk
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, thunkAPI) => {
    try {
      return await signUp(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user.name;
        state.token = action.payload.data.token;
        state.role = action.payload.data.user.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Signup
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: store user & token after signup
        state.user = action.payload.data.user.name;
        state.token = action.payload.data.token;
        state.role = action.payload.data.user.role;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;*/
/*
// src/features/authentication/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      return await login(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// authSlice.js (simplified)
const initialState = {
  user: null,   // after login -> { name, email, token }
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.clear();
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.name;
        state.token = action.payload.data.token;
        state.role = action.payload.data.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;*/
/*// src/features/authentication/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./authService";
import { signUp } from "./authService"; // ✅ we’ll create this

// Login thunk (already exists)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      return await login(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Signup thunk
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, thunkAPI) => {
    try {
      return await signUp(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user.name;
        state.token = action.payload.data.token;
        state.role = action.payload.data.user.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Signup
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: store user & token after signup
        state.user = action.payload.data.user.name;
        state.token = action.payload.data.token;
        state.role = action.payload.data.user.role;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; */
// src/features/authentication/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./authService";

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      return await login(credentials); // returns axios response
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    userId: localStorage.getItem("userId") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.userId = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload.data;

        // update redux state
        state.user = user.name;
        state.token = token;
        state.role = user.role;
        state.userId = user.userId;

        // ✅ persist to localStorage
        localStorage.setItem("user", user.name);
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("userId", user.userId);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
