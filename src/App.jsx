import TasksPage from "./pages/TasksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import SidebarLayout from "./components/SidebarLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <Router>
      <div className="font-inter min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<PrivateRoute><SidebarLayout><TasksPage /></SidebarLayout></PrivateRoute>} />
          <Route path="/add-task" element={<PrivateRoute><SidebarLayout><AddTask /></SidebarLayout></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><SidebarLayout><Dashboard /></SidebarLayout></PrivateRoute>} />
          <Route path="/edit-task/:id" element={<PrivateRoute><SidebarLayout><EditTask /></SidebarLayout></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
};

export default App;

