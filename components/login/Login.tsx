"use client";
import { validateEmail, validatePassword } from "@/helpers/validations";
import { LoginFormValuesType } from "@/types/commonTypes";
import React, { useDeferredValue, useState } from "react";
import { SubmitButton } from "../common/Buttons";
import { CustomInput } from "../common/Input";

const LoginComponent: React.FC = () => {
  const [values, setValues] = useState<LoginFormValuesType>({
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
      emailError: "",
      passwordError: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;

    let emailError = "";
    let passwordError = "";

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

    if (emailError || passwordError) {
      setValues({ ...values, emailError, passwordError });
    } else {
      setValues({ ...values, emailError: "", passwordError: "", isSubmitting: true });
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Submitted:", { email, password });
        setValues({ ...values, email: "", password: "", isSubmitting: false });
      } catch (error) {
        console.error("Error:", error);
        setValues({ ...values, isSubmitting: false });
      }
    }
  };

  const { email, password, emailError, passwordError, isSubmitting } = values;
  const signupText = "Or, You can simply";
  return (
    <div className="flex justify-center w-80 sm:w-96 items-center min-h-full">
      <div className="border border-grey  rounded-md p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
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
            text={isSubmitting ? "Loginin..." : "Login"}
            disable={isSubmitting || !email || !password || emailError !== "" || passwordError !== ""}
          />
          <p className="text-white-500">{signupText}</p>
          <SubmitButton type="submit" text={isSubmitting ? "Never Mind..." : "Signup"} disable={isSubmitting} />
        </form>
      </div>
    </div>
  );
};
export default LoginComponent;
