import React from "react";
import TasksPage from "./pages/TasksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <Router>
      <div className="font-inter min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
