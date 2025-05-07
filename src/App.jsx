import {useState} from 'react';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = (newTask) => {
   setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
  
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
  
  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
    <h1 className="text-2xl font-bold text-center mb-4">Task Master</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  )
};
export default App
