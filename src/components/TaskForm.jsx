import React, {useState} from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !deadline) {
      alert("Please fill in title and deadline");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      priority,
      deadline,
      completed: false,
    };

    onAdd(newTask);
    setTitle("");
    setPriority("Low");
    setDeadline("");
  };

  return (
      <form onSubmit={handleSubmit}className="bg-white p-4 shadow rounded">
        <p>Input task:</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task"
          className="w-full p-2 border rounded mb-4"
        />
        <p>Input the priority of task:</p>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <p>Input deadline: </p>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Add Task
        </button>
      </form>
    );
  }
  export default TaskForm;
  