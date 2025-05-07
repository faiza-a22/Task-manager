import React from 'react';
function TaskItem({task, onDelete, onToggle}) {
    return (
      <div className={`p-4 border rounded mb-2 flex justify-between items-center ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}>
        <div>
          <h2 className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
            {task.title}
          </h2>
          <p className="text-sm text-gray-600">Priority: {task.priority}</p>
          <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onToggle(task.id)}
            className="px-2 py-1 bg-green-400 text-white rounded hover:bg-yellow-500">
              {task.completed ? "Undo" : "Complete"}
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ) 
  }
  export default TaskItem;
  