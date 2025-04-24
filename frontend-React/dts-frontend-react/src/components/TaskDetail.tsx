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
    <div>
      <h2>Task Detail</h2>
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
        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskDetail;
