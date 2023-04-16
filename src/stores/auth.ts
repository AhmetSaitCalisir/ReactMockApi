import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IAuthUser from "../models/AuthUser";
import { authService } from "../services/auth.service";

export const login = createAsyncThunk(
  "/auth/login",
  async (user: IAuthUser) => {
    return await authService.login(user);
  }
);

export const logout = createAsyncThunk(
  "/auth/logout",
  async () => await authService.logout()
);

export const register = createAsyncThunk(
  "/auth/register",
  async (user: IAuthUser) => {
    return await authService.register(user);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: localStorage.getItem("X-Username"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload.username;
      })
      .addCase(login.rejected, (state) => {
        state.authUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.authUser = action.payload.username;
      })
      .addCase(register.rejected, (state) => {
        state.authUser = null;
      });
  },
});

export default authSlice.reducer;
