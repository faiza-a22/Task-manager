import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/get-task-by-id/${id}`);
        const t = response.data.data;

        const formattedDeadline = new Date(t.deadline).toISOString().slice(0, 16);

        setTask({
          ...t,
          deadline: formattedDeadline,
        });
      } catch (err) {
        console.error("Failed to fetch task:", err);
      }
    };

    fetchTask();
  }, [id]);

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
      await axiosInstance.post(`/update-task/${id}`, {
        ...task,
        priority: Number(task.priority),
        deadline: new Date(task.deadline).toISOString(),
      });
      alert("Task updated!");
      navigate("/");
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Update failed.");
    }
  };

  if (!task) return <p>Loading task data...</p>;
    return (
      <TaskForm task={task} onChange={handleChange} onSubmit={handleSubmit} isEdit={true} />

    );
}

export default EditTask;