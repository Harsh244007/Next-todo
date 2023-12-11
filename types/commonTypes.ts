import store from "@/store/store";
import React from "react";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export type storeType = {
  value: number;
  token: string | null;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isSubmitting: boolean;
  name?: string;
  nameError?: string;
};

export type ButtonType = {
  type: "submit";
  text: string;
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
