"use client";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "@/helpers/validations";
import { LoginFormValuesType } from "@/types/commonTypes";
import { SubmitButton } from "../common/Buttons";
import { CustomInput } from "../common/Input";

const SignupComponent: React.FC = () => {
  const [values, setValues] = useState<LoginFormValuesType>({
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    isSubmitting: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      nameError: "",
    emailError: "",
    passwordError: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = values;

    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (!name || name.length < 3 || /[^a-zA-Z]/.test(name)) {
      nameError = "Name should be at least 3 characters without special characters";
    }

    if (!email) {
      emailError = "Email is required";
    } else if (!validateEmail(email)) {
      emailError = "Please enter a valid email";
    }

    if (!password) {
      passwordError = "Password is required";
    } else if (!validatePassword(password)) {
      passwordError = "Password should have 8 characters with at least one capital letter";
    }

    if (nameError || emailError || passwordError) {
      setValues({ ...values, nameError, emailError, passwordError });
    } else {
      setValues({ ...values, nameError: "", emailError: "", passwordError: "", isSubmitting: true });
      try {
        // Simulated async submission delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Submitted:", { name, email, password });
        setValues({ ...values, name: "", email: "", password: "", isSubmitting: false });
      } catch (error) {
        console.error("Error:", error);
        setValues({ ...values, isSubmitting: false });
      }
    }
  };

  const { name, email, password, nameError, emailError, passwordError, isSubmitting } = values;
  const signupText = "Or, you can simply";

  return (
    <div className="flex justify-center w-80 sm:w-96 items-center min-h-full">
      <div className="border border-grey rounded-md p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
          <div className="">
            <CustomInput
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
            />
            {nameError && <p className="text-red-500 mt-1">{nameError}</p>}
          </div>
          <div className="">
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
            />
            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
          </div>
          <div className="">
            <CustomInput          
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
/>
            {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
          </div>
          <SubmitButton
            type="submit"
            text={isSubmitting ? "Signing Up..." : "Sign Up"}
            disable={isSubmitting || nameError !== "" || emailError !== "" || passwordError !== ""}
          />
          <p className="text-white-500">{signupText}</p>
          <SubmitButton type="submit" text={isSubmitting ? "Never Mind..." : "Login Back"} disable={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;
