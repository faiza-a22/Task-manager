import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Spin } from "antd";
import { toast } from "react-toastify";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
 

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/DailyTask/${id}`);
        const t = response.data.data;

        setTask({
          ...t,
          deadline: dayjs(t.deadline),
        });
      } catch (err) {
        toast.error("Failed to fetch task", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false, 
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Failed to fetch task:", err);
        navigate("/tasks"); // Redirect to home if task not found
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

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
      await axiosInstance.put(`/api/DailyTask/${id}`, {
        ...task,
        priority: Number(task.priority),
        deadline: new Date(task.deadline).toISOString(),
      });
      toast.success('Task updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/");
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Update failed.", {
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

  if (loading || !task) return <Spin size="large" className="mt-10" />;

  if (!task) return <p>Loading task data...</p>;
    return (
      <TaskForm task={task} onChange={handleChange} onSubmit={handleSubmit} isEdit={true} />

    );
}

export default EditTask;