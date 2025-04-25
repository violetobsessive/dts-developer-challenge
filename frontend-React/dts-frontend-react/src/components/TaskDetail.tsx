// To show details of a single task

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask, Task } from "../serviecs/TaskService";

const TaskDetail: React.FC = () => {
  // Get id dyncamically from endpoint route
  const { id } = useParams<{ id: string }>();

  // Store details of a task, set it as null as defulat when initialising
  const [task, setTask] = useState<Task | null>(null);

  // when component is loading/Id changes, get task deatil from backend and store in task
  useEffect(() => {
    const load = async () => {
      const res = await getTask(Number(id));
      setTask(res.data);
    };
    load();
  }, [id]);

  // if task hasn't loaded, show Loading... on the page
  if (!task) return <div>Loading...</div>;

  // // UI for the landing page
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card bg-secondary text-white" style={{ width: "30rem" }}>
        <div className="card-body">
          <h2 className="card-title">Task Detail</h2>
          <p className="card-text">
            <strong>Title:</strong> {task.title}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {task.description || "(none)"}
          </p>
          <p className="card-text">
            <strong>Status:</strong> {task.status}
          </p>
          <p className="card-text">
            <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
