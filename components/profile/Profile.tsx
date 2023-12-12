"use client";
import { updateName, updateProfileImage, removeToken } from "@/store/slices/storeSlice";
import { RootState } from "@/types/commonTypes";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "../common/Buttons";
import { CustomInput } from "../common/Input";
import { useRouter } from "next/navigation";

const ProfileComponent = () => {
  const dispatch = useDispatch();

  const { profileData, token } = useSelector((state: RootState) => state.store);

  const navigate = useRouter();
  if (!token) {
    dispatch(removeToken());
    navigate.push("/login");
    return;
  }
  const [newName, setNewName] = useState(profileData.name);
  const [newProfileImage, setNewProfileImage] = useState(profileData.profileImage);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setNewProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameSubmit = () => {
    dispatch(updateName(newName));
  };

  const handleProfileImageSubmit = () => {
    dispatch(updateProfileImage(newProfileImage));
  };

  const handleLogOut = () => {
    dispatch(removeToken());
    navigate.push("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around w-full gap-4">
      <div className="mt-8 flex flex-col gap-4 w-50">
        <h2 className="block lg:hidden text-white text-2xl">Profile Information</h2>

        <Image
          src={newProfileImage}
          alt={name + "Profile Image"}
          width={300}
          height={300}
          className="w-32 h-32 rounded-full object-cover"
        />
        <input type="file" accept="image/*" onChange={handleProfileImageChange} className="mt-2" />
        <SubmitButton
          className="bg-blue-500"
          disable={false}
          onClick={handleProfileImageSubmit}
          text="Upload Profile Image"
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 w-50 lg:w-80 ">
        <h2 className="text-white text-3xl hidden lg:block mb-2">Profile Information</h2>
        <CustomInput
          className="text-black h-8 rounded-md border-radius-4 p-4"
          placeholder="name"
          name="name"
          type="text"
          value={newName}
          onChange={handleNameChange}
        />
        <SubmitButton className="bg-blue-500" onClick={handleNameSubmit} text="Update Name" disable={false} />
        <SubmitButton disable={false} className="bg-red-500 mt-5" onClick={handleLogOut} text="Logout" />
      </div>
    </div>
  );
};
export default ProfileComponent;
