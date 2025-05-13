import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import TaskForm from "../components/TaskForm";

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
        await axiosInstance.post("/create-task", {
          ...task,
          priority: Number(task.priority),
          deadline: new Date(task.deadline).toISOString(),
        });
        alert("Task created!");
        navigate("/");
      } catch (error) {
        console.error("Error creating task:", error);
        alert("Failed to create task");
      }
    };
  
    return (
      <TaskForm task={task} onChange={handleChange} onSubmit={handleSubmit} />
    );
  };
  
export default AddTask;