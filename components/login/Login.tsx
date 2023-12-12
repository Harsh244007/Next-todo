"use client";
import { validateEmail, validatePassword } from "@/helpers/validations";
import { LoginFormValuesType } from "@/types/commonTypes";
import React, { useDeferredValue, useState } from "react";
import { SubmitButton } from "../common/Buttons";
import { CustomInput } from "../common/Input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken, updateProfileDetails } from "@/store/slices/storeSlice";

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
        const response = await fetch("/api/routes/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const res = await response.text();
        // console.log(res);
        if (response.status !== 200) {
          setValues({ ...values, passwordError: res, isSubmitting: false });
        } else {
          const loginMessage = "Login succesful redircting to tasks"
          setValues({ ...values, email: "", password: "",passwordError:loginMessage, isSubmitting: false });
          let data = JSON.parse(res);
          dispatch(
            updateProfileDetails({
              name: data.users.name,
              email: data.users.email,
              profileImage: data.users.profileImage,
              id: data.users._id,
            })
          );
          dispatch(setToken(data.token));
          router.push("/tasks");
        }
      } catch (error) {
        console.error("Error:", error);
        setValues({ ...values, isSubmitting: false });
      }
      return;
    }
  };

  const { email, password, emailError, passwordError, isSubmitting } = values;
  const signupText = "Or, You can simply";
  return (
    <div className="flex justify-center w-80 sm:w-96 items-center min-h-full">
      <div className="border border-grey w-50 md:w-80  rounded-md p-6 shadow-md">
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
            className=""
            type="submit"
            onClick={() => {}}
            text={isSubmitting ? "Loginin..." : "Login"}
            disable={isSubmitting || (emailError !== "" && passwordError !== "")}
          />
          <p className="text-white-500">{signupText}</p>
        </form>
        <SubmitButton
          className=""
          text={isSubmitting ? "Never Mind..." : "Signup"}
          disable={isSubmitting}
          onClick={() => router.push("signup")}
        />
      </div>
    </div>
  );
};
export default LoginComponent;
