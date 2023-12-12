"use client";
import { RootState } from "@/types/commonTypes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, updateAllTasks, updateProfileDetails } from "@/store/slices/storeSlice";
import { useEffect, useState, useDeferredValue } from "react";
import NewTaskComponent from "@/components/common/CreateTask";
import TaskRender from "./TaskRender";
import TaskFilter from "./TaskFilter";

const TaskComponent = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const deferredSearchTerm = useDeferredValue(searchTerm);

  //new task states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newTaskErrorMessage, setNewTaskErrorMessage] = useState("");
  const [status, setStatus] = useState("To Do");
  const [filterStatus, setFilterStatus] = useState("All");

  const [updateTasks, setUpdateTasks] = useState(false);

  const { token, profileData, tasks } = useSelector((state: RootState) => state.store);
  useEffect(() => {
    if (!token) {
      dispatch(removeToken());
      navigate.push("/login");
      return;
    }
    async function fetchTasks(id: string) {
      try {
        const response = await fetch(`/api/routes/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // @ts-ignore
        dispatch(
          updateProfileDetails({
            name: data.user.name,
            profileImage: data.user.profileImage,
            email: data.user.email,
            id: data.user._id,
          })
        );
        dispatch(updateAllTasks(data.tasks));
        setLoading(false);
        setError(false);
      } catch (e) {
        setError(true);
        setLoading(false);
        console.log("Error while fetching tasks:", e);
      }
    }
    fetchTasks(profileData.id);
  }, [profileData.id, updateTasks, navigate, token]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const reFetchData = ()=>{
    setUpdateTasks(!updateTasks);
  }
  const handleCreateTask = async () => {
    if (newTaskErrorMessage !== "") setNewTaskErrorMessage("");
    if (title === "") setNewTaskErrorMessage("Title is Required");
    if (description === "") setNewTaskErrorMessage("Description is Required");
    if (status === "") setNewTaskErrorMessage("Status is Required");
    if (title === "" || description === "" || status === "") return;
    try {
      const response = await fetch("/api/routes/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          status,
          id: profileData.id,
        }),
      });
      console.log(response, "response");
      if (response.status == 201) {
        setTitle("");
        setDescription("");
        setStatus("In Progress");
        reFetchData()
      } else {
        setError(true);
        console.error("Error creating task");
      }
    } catch (error) {
      setNewTaskErrorMessage("Error Creating Task.");
      console.error("Error creating task:", error);
    }
  };

  const handleFilterStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  return (
    <main className="p-4 my-10 w-full max-w-5xl bg-slate-600 bg-opacity-40 backdrop-filter-sm min-h-full">
      <TaskFilter searchTerm={searchTerm} handleSearch={handleSearch} filterStatus={filterStatus} handleFilterStatusChange={handleFilterStatusChange} showCreateTask={showCreateTask} setShowCreateTask={setShowCreateTask} tasks={tasks} />
      {showCreateTask && (
        <NewTaskComponent
          handleCreateTask={handleCreateTask}
          handleDescriptionChange={handleDescriptionChange}
          handleTitleChange={handleTitleChange}
          handleStatusChange={handleStatusChange}
          title={title}
          description={description}
          status={status}
        />
      )}
      {showCreateTask && newTaskErrorMessage !== "" && (
        <p className="text-red-500 text-bold mb-4 text-xl">{newTaskErrorMessage}</p>
      )}
      <section>
        {loading && <p>Loading...</p>}
        {error && <p>Error while fetching tasks. Please try again.</p>}
        {!loading && !error && tasks.length === 0 && <p>No tasks available. Please create one.</p>}
        {!loading && !error && tasks.length > 0 && (
          <TaskRender reFetchData={reFetchData} filterStatus={filterStatus} deferredSearchTerm={deferredSearchTerm} searchTerm={searchTerm} />
        )}
      </section>
    </main>
  );
};
export default TaskComponent;
