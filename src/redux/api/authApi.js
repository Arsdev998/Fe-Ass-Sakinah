import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const login = createAsyncThunk(
  "auth/login",
  async (userData, {rejectWithValue}) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/login",
        userData,
        // config
      );
      return data
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
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
