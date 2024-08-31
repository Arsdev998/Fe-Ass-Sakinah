import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";


export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/login",
        userData,
        // config
      );
      console.log("tess");
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkApi) => {
  try {
    const {data}  = await axiosInstance.get("/api/user/profile");
    return data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message)
  }
});


export const logoutUser = createAsyncThunk("auth/logout", async(_,thunkApi)=>{
  try {
    const {data} = await axiosInstance.post("/api/auth/logout");
    return data.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
})
