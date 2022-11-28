import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signIn: false,
  signUp: false,
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
};

export const createUser = createAsyncThunk(
  "users/create",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4040/users/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }

      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4040/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      localStorage.setItem("token", json);
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
        state.signUp = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.signUp = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.signUp = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.signIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.signIn = false;
        state.token = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.signIn = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
