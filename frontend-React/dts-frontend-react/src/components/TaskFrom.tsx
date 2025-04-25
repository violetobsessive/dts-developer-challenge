// To create tasks

import React, { useState } from "react";
import { createTask, Task } from "../serviecs/TaskService";

// defines props type
interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  // Initializes the task state with default values
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  // Input change handler for handling multiple form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Updates the task state on input change using the input's name attribute
  // Submits the form via POST.
  // Clears the form on success and triggers the onTaskCreated() callback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(task);
      setTask({ title: "", description: "", status: "Pending", dueDate: "" });
      onTaskCreated();
    } catch (err) {
      alert("Error creating task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-wrap align-items-center gap-2 mb-4"
    >
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border px-2 py-1 rounded"
      />
      <input
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="border px-2 py-1 rounded"
      />
      <input
        name="dueDate"
        type="datetime-local"
        value={task.dueDate}
        onChange={handleChange}
        required
        className="border px-2 py-1 rounded"
      />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
      >
        <option>Pending</option>
        <option>Completed</option>
      </select>

      <div className="ml-4">
        <button
          type="submit"
          className="text-white px-4 py-2 rounded btn btn-danger ms-2"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
