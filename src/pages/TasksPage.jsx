import { useEffect, useState } from "react";
import TaskTable from "../components/TaskTable";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const TasksPage = () => {
    
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('/get-all-tasks');
                setTasks(response.data.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load tasks");
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const filteredTasks = Array.isArray(tasks) ? tasks.filter((task) => {
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
        await axiosInstance.delete(`/delete-task/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
        alert("Error deleting task");
        console.error(err);
    }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold ">Tasks</h1>
                {/* <Link to="/add-task">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 rounded">
                        Add Task
                    </button>
                </Link> */}
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