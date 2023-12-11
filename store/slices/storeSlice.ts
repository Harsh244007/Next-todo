"use client"
import { storeType } from "@/types/commonTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: storeType = {
  value: 0,
  token: typeof window != 'undefined'&&  localStorage?.getItem("token")?localStorage?.getItem("token") :null,
};
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    setToken: (state, action: { payload: string }) => {
      state.token = action.payload;
      localStorage?.setItem("token", action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage?.removeItem("token");
    },
  },
});

export const { increase,setToken,removeToken } = storeSlice.actions;

export default storeSlice.reducer;
