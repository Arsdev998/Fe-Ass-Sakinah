import { createSlice } from "@reduxjs/toolkit";
import { login, loadUser, logoutUser } from "../api/authApi.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isLogout: false,
    authLoading: false,
    message: null,
    error: null,
    user: null,
  },
  reducers: {
    authReset: (state) => {
      state.isAuth = false;
      state.authLoading = false;
      state.user = null;
      state.isLogout = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.authLoading = false), (state.isAuth = true);
        state.user = action.payload;
        state.isLogout = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.authLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = action.payload.error;
      })
      .addCase(loadUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        (state.authLoading = false), (state.isLogout = false);
        state.isAuth = true;
        (state.user = action.payload), (state.error = null);
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.authLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuth = false;
        state.isLogout = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.authLoading = false;
        state.isAuth = true;
        state.isLogout = false;
        state.message = action.payload;
      });
  },
});

export const { authReset } = authSlice.actions;

export default authSlice.reducer;
