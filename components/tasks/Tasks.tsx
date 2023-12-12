"use client";
import { RootState,storeTasksType } from "@/types/commonTypes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, updateAllTasks } from "@/store/slices/storeSlice";
import { useEffect, useState,useDeferredValue } from "react";

const TaskComponent = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");

  const deferredSearchTerm = useDeferredValue(searchTerm);


  const { token, profileData, tasks } = useSelector((state: RootState) => state.store);
  if (!token || profileData.id.length < 6) {
    dispatch(removeToken());
    navigate.push("/login");
    return;
  }

  useEffect(() => {
    async function fetchTasks(id: string) {
      if (id.length <= 5) return navigate.push("/login");
      console.log("me inside");
      try {
        const response = await fetch(`/api/routes/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        dispatch(updateAllTasks(data));
        setLoading(false);
        setError(false);
      } catch (e) {
        setError(true);
        setLoading(false);
        console.log("Error while fetching tasks:", e);
      }
    }
    fetchTasks(profileData.id);
  }, [profileData.id, navigate, token]);

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateTask = () => {
    console.log("Create Task clicked");
  };
  return (
<div className="p-4 my-10 bg-slate-400 bg-opacity-50 backdrop-filter-sm min-h-full">
      <div className="flex flex-wrap justify-center gap-4 md:justify-between items-center mb-4">
      <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          value={deferredSearchTerm}
          className="p-2 border rounded-md text-black"
          disabled={tasks&& tasks.length === 0}
        />
        <button onClick={handleCreateTask} className="p-2 bg-blue-500 text-white rounded-md">
          Create New Task
        </button>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error while fetching tasks. Please try again.</p>}
        {!loading && !error && tasks.length === 0 && <p>No tasks available. Please create one.</p>}
        {!loading && !error && tasks.length > 0 && (
          <div className="">
            {tasks.filter((item:storeTasksType)=>searchTerm!==""?item.title.toLowerCase().includes(searchTerm.toLowerCase()):item).map((task:storeTasksType) => (
              <div key={task._id} className="cursor-pointer border p-4 mb-4 rounded-md bg-slate-900 text-white">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-500">{task.status}</p>
                </div>
                <p>{task.description}</p>
                <div className="flex items-center mt-2">
                  <img src={profileData.profileImage} alt="Profile" className="h-8 w-8 rounded-full mr-2" />
                  <p>{profileData.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskComponent;
