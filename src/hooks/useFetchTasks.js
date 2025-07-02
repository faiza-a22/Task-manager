import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useFetchTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get("/DailyTask");
                setTasks(response.data.data || []);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    return { tasks, loading, setTasks};
};

export default useFetchTasks;

