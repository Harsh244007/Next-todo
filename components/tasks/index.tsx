import dynamic from "next/dynamic";

const TaskComponent = dynamic(()=>import("./Tasks"))
export default TaskComponent