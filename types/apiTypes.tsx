import mongoose, { Document, Model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  password: string;
  email: string;
  profileImage: string;
  tasks?: mongoose.Schema.Types.ObjectId[];
}

export type UserModalType = Model<UserDocument>;

export interface TaskDocument extends Document {
  title: string;
  description: string;
  status: "In Progress" | "Done" | "Started";
  user: mongoose.Schema.Types.ObjectId;
}

export type TasksModalType = Model<TaskDocument>;

export type jwtUserType = {
  email?: string;
  id?:string;
};
