import { TaskDocument, TasksModalType } from "@/types/apiTypes";
import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["In Progress", "Done", "To Do"],
      default: "To Do",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

let TasksModal: TasksModalType;
const taskModels =mongoose.models.tasks

if (taskModels) TasksModal = taskModels as TasksModalType;
else TasksModal = mongoose.model<TaskDocument, TasksModalType>("tasks", taskSchema);

export default TasksModal;
