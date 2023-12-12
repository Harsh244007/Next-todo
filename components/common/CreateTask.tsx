import React, { memo } from "react";
type NewTaskProps = {
  title: string;
  description: string;
  status: string;
  handleCreateTask: () => Promise<void>;
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
const NewTaskComponent = (props: NewTaskProps) => {
  return (
    <section className="flex flex-wrap justify-center gap-4 md:justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Title"
        value={props.title}
        onChange={props.handleTitleChange}
        className="p-2 border rounded-md text-white bg-transparent"
      />
      <textarea
        placeholder="Description"
        value={props.description}
        onChange={props.handleDescriptionChange}
        className="p-2 border rounded-md text-white bg-transparent"
      />
      <select
        value={props.status}
        onChange={props.handleStatusChange}
        className="p-2 border rounded-md text-white bg-blue-500"
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
      <button onClick={props.handleCreateTask} className="p-2 bg-blue-500 text-white rounded-md">
        Create Task
      </button>
    </section>
  );
};
export default memo(NewTaskComponent);
