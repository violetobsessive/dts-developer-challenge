// To display and manage tasks

import React, { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  updateTaskStatus,
  Task,
} from "../serviecs/TaskService";
import { Link } from "react-router-dom";

interface TaskListProps {
  refreshFlag: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ refreshFlag }) => {
  // UseState to store task information retrived from backend requests
  const [tasks, setTasks] = useState<Task[]>([]);

  // async function to store all tasks
  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  // function to delete task and reload the tasks
  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  // update status is id not null, then load tasks again
  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === "Pending" ? "Completed" : "Pending";
    await updateTaskStatus(task.id!, newStatus);
    loadTasks();
  };

  // load tasks if there is a change on refreshFlag / when component is loading
  useEffect(() => {
    loadTasks();
  }, [refreshFlag]);

  // UI for the page
  return (
    <div>
      <h3 className="ms-3">Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-dark text-white"
          >
            <div className="flex-grow-1 me-3">
              <Link to={`/tasks/${task.id}`} className="text-info fw-bold ">
                {task.title}
              </Link>{" "}
              ({task.status}) – Due: {new Date(task.dueDate).toLocaleString()}
            </div>
            <div className="btn-group">
              <button
                onClick={() => toggleStatus(task)}
                className="btn btn-sm btn-secondary"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(task.id!)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
