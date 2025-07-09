import { useState } from "react";
import TaskTable from "../components/TaskTable";
import axiosInstance from "../api/axiosInstance";
import { Link, useLocation } from "react-router-dom";
import useFetchTasks from "../hooks/useFetchTasks";
import { Spin } from "antd";
import { toast } from 'react-toastify';


const TasksPage = () => {
    const {tasks,loading,setTasks} =  useFetchTasks();
    const [search, setSearch] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const statusFilter = query.get("filter");
    console.log("Filter from URL:", statusFilter);


    if (loading) return <div className="flex justify-center items-center h-40">
          <Spin tip="Loading stats..." size="large" />
        </div>;
    if (error) return <div>{error}</div>;

    const filteredTasks = Array.isArray(tasks) ? tasks
    .filter((task) => {
        if (statusFilter === "completed" && !task.isCompleted) return false;
        if (statusFilter === "pending" && task.isCompleted) return false;
        return true; // show all status
      })
    
    .filter((task) => {
        const query = search.toLowerCase();
        const idMatch = task.id?.toLowerCase().includes(query);
        const titleMatch = task.title?.toLowerCase().includes(query);
        const descMatch = task.description?.toLowerCase().includes(query);
        const priorityMatch = String(task.priority)?.toLowerCase().includes(query);
        const deadlineMatch = new Date(task.deadline)
        .toLocaleString()
        .toLowerCase()
        .includes(query);

        return idMatch || titleMatch || descMatch || priorityMatch || deadlineMatch
    }  
    ) : [];

    const handleDelete = async (id) => {
    try {
        await axiosInstance.delete(`/api/DailyTask/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
        toast.error("Failed to delete task", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        console.error(err);
    }
    };
    
    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold ">Tasks</h1>
                <Link to="/add-task">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 rounded">
                        Create Task
                    </button>
                </Link>
            </div>
        
            
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mb-5"
            />

            <TaskTable tasks={filteredTasks} onDelete ={handleDelete} />
        </div>
    )
}

export default TasksPage;