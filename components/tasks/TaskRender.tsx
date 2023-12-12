import { RootState, storeTasksType } from "@/types/commonTypes";
import React, { memo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "./../../helpers/validations";

type TaskRemderType = {
  filterStatus: string;
  searchTerm: string;
  deferredSearchTerm: string;
  reFetchData: () => void;
};

const TaskRender = (props: TaskRemderType) => {
  const { profileData,  token, tasks } = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch();
  const [taskToDelete, setTaskToDelete] = useState<storeTasksType | null>(null);
  const [requestedStatusUpdate, setRequestedStatusUpdate] = useState<string | null>(null);
  const [modifiedStatus, setModifiedStatus] = useState<{ [key: string]: string }>({});
  const deleteTask = async (taskId: string) => {
    try {
      await fetch(`api/routes/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      props.reFetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await fetch(`api/routes/tasks/status/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      props.reFetchData();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteClick = (task: storeTasksType) => {
    setTaskToDelete(task);
  };

  const handleDeleteConfirm = (task: storeTasksType, confirm: boolean) => {
    if (confirm && taskToDelete) {
      deleteTask(taskToDelete._id);
    }
    setTaskToDelete(null);
  };

  const handleStatusUpdate = (task: storeTasksType, newStatus: string) => {
    updateTaskStatus(task._id, newStatus);
    setModifiedStatus({
      ...modifiedStatus,
      [task._id]: newStatus !== task.status ? newStatus : task.status,
    });
    setRequestedStatusUpdate(newStatus);
  };

  return (
    <div className="">
      {tasks
        .filter((item: storeTasksType) => {
          if (props.deferredSearchTerm !== "" && props.filterStatus !== "All") {
            return (
              item.title.toLowerCase().includes(props.searchTerm.toLowerCase()) && item.status == props.filterStatus
            );
          } else if (props.deferredSearchTerm === "" && props.filterStatus !== "All") {
            return item.status == props.filterStatus;
          } else if (props.deferredSearchTerm !== "" && props.filterStatus === "All") {
            return item.title.toLowerCase().includes(props.searchTerm.toLowerCase());
          } else return item;
        })
        .map((task: storeTasksType) => (
          <section key={task._id} className="flex flex-col lg:flex-row gap-5 mb-4 h-full lg:h-40">
            <article className="grow cursor-pointer border p-4  rounded-md bg-slate-900 text-white">
              <div className="flex justify-between">
                <h3 className="text-2xl font-semibold">Title : {task.title}</h3>
                <p
                  className={`${
                    task.status == "Done"
                      ? "text-green-500"
                      : task.status == "To Do"
                      ? "text-gray-200"
                      : "text-blue-500"
                  }`}
                >
                  {task.status}
                </p>
              </div>
              <p className="text-sm mb-2">Description: {task.description}</p>
              <div className="flex items-center mt-2">
                <img src={profileData.profileImage} alt="Profile" className="h-8 w-8 rounded-full mr-2" />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{profileData.name}</p>

                  <p className="text-sm font-semibold">{formatDate(task.updatedAt)}</p>
                </div>
              </div>
            </article>
            <article className="flex flex-row lg:flex-col item-center justify-around h-full">
              <button
                className="bg-red-500 w-30 h-10 hover:bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteClick(task)}
              >
                Delete
              </button>

              {taskToDelete && taskToDelete._id === task._id ? (
                <div className="text-red-500 flex justify-center items-center">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteConfirm(task, true)}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleDeleteConfirm(task, false)}
                  >
                    No
                  </button>
                </div>
              ) : (
                <>
                  <select
                    value={modifiedStatus[task._id] || task.status}
                    onChange={(e) => handleStatusUpdate(task, e.target.value)}
                    className="p-2 border rounded-md text-white bg-blue-500 h-10 w-30 "
                  >
                    <option className="text-white border" value="To Do">
                      To Do
                    </option>
                    <option className="text-white border" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-white  border" value="Done">
                      Done
                    </option>
                  </select>
                  <button
                    disabled={task.status === modifiedStatus[task._id]}
                    className={`bg-blue-500 w-30 h-10 hover:bg-red-600 text-white px-2 py-1 rounded ${
                      !modifiedStatus[task._id] || modifiedStatus[task._id] === task.status
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => updateTaskStatus(task._id,modifiedStatus[task._id])}
                  >
                    Update
                  </button>
                </>
              )}
            </article>
          </section>
        ))}
    </div>
  );
};
export default memo(TaskRender);
