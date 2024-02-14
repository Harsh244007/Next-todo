import store from "@/store/store";
import React, { ChangeEventHandler, MouseEventHandler } from "react";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export type storeProfileType = {
  name: string;
  email: string;
  profileImage: string;
  id:string;
};

export type storeTasksType = {
  _id: string;
  title: string;
  description: string;
  status: string;
  user: storeProfileType;
  createdAt:string;
  updatedAt:string;
};
export type storeType = {
  value: number;
  token: string | null;
  profileData: storeProfileType;
  tasks: [storeTasksType] | [];
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  showPassword:boolean;
  isSubmitting: boolean;
  name?: string;
  nameError?: string;
};

export type ButtonType = {
  type?: "submit";
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
  className: string;
  disable: boolean;
};

export type CustomInputType = {
  type: string;
  name: string;
  placeholder: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
};

export type ParticlesTypes ={
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}


export type updateType = {
id:string,
newStatus:string,
}
export type useOptimisticUpdateType = {
  update: (id:string) => string;
};