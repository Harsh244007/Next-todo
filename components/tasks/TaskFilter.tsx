import { storeTasksType } from "@/types/commonTypes";
import React,{Dispatch, SetStateAction, memo} from "react"

type TaskFilterType={
    searchTerm:string;
    tasks:[storeTasksType] | [];
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterStatus:string;
    handleFilterStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    showCreateTask:boolean;
    setShowCreateTask:Dispatch<SetStateAction<boolean>>
}

const TaskFilter=(props:TaskFilterType)=>{
return (<section className="flex flex-wrap justify-center gap-4 md:justify-between items-center mb-4">
<input
  type="text"
  placeholder="Search..."
  onChange={props.handleSearch}
  value={props.searchTerm}
  className="p-2 border rounded-md text-white bg-transparent"
  disabled={props.tasks && props.tasks.length === 0}
/>
<select
  value={props.filterStatus}
  onChange={props.handleFilterStatusChange}
  className="p-2 border rounded-md text-white bg-blue-500"
>
  <option className="text-white border" value="All">
    All
  </option>
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
<button onClick={() => props.setShowCreateTask(!props.showCreateTask)} className="p-2 bg-blue-500 text-white rounded-md">
  {props.showCreateTask ? "Hide" : "Create"} New Task
</button>
</section>)
}
export default memo(TaskFilter)