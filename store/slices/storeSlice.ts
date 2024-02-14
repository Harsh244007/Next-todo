"use client";
import { storeProfileType, storeTasksType, storeType, updateType } from "@/types/commonTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: storeType = {
  value: 0,
  token:
    typeof window != "undefined" &&
    window.localStorage &&
    window.localStorage?.getItem("token") &&
    localStorage.getItem("token")
      ? // @ts-ignore
        JSON.parse(localStorage.getItem("token"))
      : null,
  profileData: {
    name: "Loading name...",
    email: "johndoe@example.com",
    profileImage: "/user.png",
    id: "12345",
  },
  tasks: [],
};
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setToken: (state, action: { payload: string }) => {
      state.token = action.payload;
      typeof window != "undefined" &&
        window.localStorage &&
        window.localStorage?.setItem("token", JSON.stringify(action.payload));
    },
    updateName: (state, action: { payload: string }) => {
      state.profileData.name = action.payload;
    },
    updateProfileImage: (state, action: { payload: string }) => {
      state.profileData.profileImage = action.payload;
    },
    updateTask: (state, action: { payload: updateType }) => {
      state.tasks.find((e)=>e._id==action.payload.id?[e.status=action.payload.newStatus]:e) 
    },
    updateProfileDetails: (state, action: { payload: storeProfileType }) => {
      state.profileData = action.payload;
    },
    updateAllTasks: (state, action: { payload: [storeTasksType] }) => {
      state.tasks = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      typeof window != "undefined" &&
        window.localStorage &&
        window.localStorage?.getItem("token") &&
        window.localStorage?.removeItem("token");
    },
  },
});

export const { setToken,updateTask, updateAllTasks, updateProfileDetails, updateName, updateProfileImage, removeToken } =
  storeSlice.actions;

export default storeSlice.reducer;
