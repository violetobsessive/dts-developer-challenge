// To show details of a single task

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, Task } from "../serviecs/TaskService";

const TaskDetail: React.FC = () => {
  // Get id dyncamically from endpoint route
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

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
    <div className="task-detail-page">
      <div className="container d-flex flex-column align-items-center mt-5">
        <div
          className="card bg-secondary text-white mb-3"
          style={{ width: "30rem" }}
        >
          <div className="card-body">
            <h2 className="card-title">Task Detail</h2>
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Description:</strong> {task.description || "(none)"}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-end" style={{ width: "30rem" }}>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => navigate("/")}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
