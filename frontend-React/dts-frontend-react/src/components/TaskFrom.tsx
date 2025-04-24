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
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="dueDate"
        type="datetime-local"
        value={task.dueDate}
        onChange={handleChange}
        required
      />
      <select name="status" value={task.status} onChange={handleChange}>
        <option>Pending</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
