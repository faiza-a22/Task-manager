import TasksPage from "./pages/TasksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import SidebarLayout from "./components/SidebarLayout";


const App = () => {
  return (
    <Router>
      <div className="font-inter min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<SidebarLayout><TasksPage /></SidebarLayout>} />
          <Route path="/add-task" element={<SidebarLayout><AddTask /></SidebarLayout>} />
          <Route path="/edit-task/:id" element={<SidebarLayout><EditTask /></SidebarLayout>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
