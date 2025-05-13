import { Link } from "react-router-dom";
function TaskRow({task, onDelete}) {
    return (
      <tr>
        <td className="p-2 border">{task.id}</td>
        <td className="p-2 border font-medium">{task.title}</td>
        <td className="p-2 border">{task.description}</td>
        <td className="p-2 border text-center">
          <span className="capitalize">{String(task.isCompleted)}</span>
        </td>
        <td className="p-2 border text-center">{task.priority}</td>
        <td className="p-2 border">
          {new Date(task.deadline).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          })}
        </td>
        <td className="flex gap-4">
          <Link to={`/edit-task/${task.id}`}>
            <button
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            >
              Update
            </button>
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 text-white ml-2 px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </td>

      </tr>
      
    ) 
  }
  export default TaskRow;
  