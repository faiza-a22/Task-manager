import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import TaskForm from "../components/TaskForm";
import { toast } from 'react-toastify';


const AddTask = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState({
      title: "",
      description: "",
      isCompleted: false,
      priority: 1,
      deadline: "",
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setTask((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axiosInstance.post("/api/DailyTask", {
          ...task,
          priority: Number(task.priority),
          deadline: new Date(task.deadline).toISOString(),
        });
        toast.success('Task created successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/dashboard");
      } catch (error) {
        console.error("Error creating task:", error);
        toast.error("Failed to create task", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
  
    return (
      <TaskForm task={task} onChange={handleChange} onSubmit={handleSubmit} />
    );
  };
  
export default AddTask;