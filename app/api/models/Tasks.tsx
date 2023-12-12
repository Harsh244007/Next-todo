import { TaskDocument, TasksModalType } from "@/types/apiTypes";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["In Progress", "Done", "Started"],
      message: "{VALUE} is not supported",
      default: "In Progress",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

let TasksModal: TasksModalType;

if (mongoose.models.tasks) TasksModal = mongoose.models.tasks as TasksModalType;
else TasksModal = mongoose.model<TaskDocument, TasksModalType>("tasks", userSchema);

export default TasksModal;
