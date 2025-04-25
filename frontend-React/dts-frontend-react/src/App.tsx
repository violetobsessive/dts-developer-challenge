// Root component integrating form, task list and task detail

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskForm from "./components/TaskFrom";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";

const App: React.FC = () => {
  // useState to control update of task list
  const [refreshFlag, setRefreshFlag] = useState(false);

  // call refreshTask when adding a task, refresh TaskList
  const refreshTasks = () => setRefreshFlag(!refreshFlag);

  return (
    // config endpoints/routes
    <Router>
      <div>
        <h1 className="ms-3">HMCTS Task Manager</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TaskForm onTaskCreated={refreshTasks} />
                <TaskList refreshFlag={refreshFlag} />
              </>
            }
          />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
