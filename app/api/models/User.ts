import { UserDocument, UserModalType } from "@/types/apiTypes";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: true, default: "/user.png" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "tasks" }],
  },
  { timestamps: true }
);

let UsersModal: UserModalType;

if (mongoose.models.users) UsersModal = mongoose.models.users as UserModalType;
else UsersModal = mongoose.model<UserDocument, UserModalType>("users", userSchema);

export default UsersModal;
