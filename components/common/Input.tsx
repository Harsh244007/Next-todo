import { CustomInputType } from "@/types/commonTypes";
import React from "react";

export const CustomInput: React.FC<CustomInputType> = ({ type, name, placeholder, value, onChange, className }) => {
  return (
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className={className} />
  );
};
