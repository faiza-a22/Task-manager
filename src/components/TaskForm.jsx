import { useNavigate } from "react-router-dom";
const TaskForm = ({task, onChange, onSubmit, isEdit}) => {
  const navigate = useNavigate();
    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <form onSubmit={onSubmit} className="space-y-4">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={onChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={onChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
            <label>Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={onChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value = "1">Low</option>
              <option value = "2">Normal</option>
              <option value = "3">High</option>
            </select>
            <label>Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={task.deadline}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="isCompleted"
              checked={task.isCompleted}
              onChange={onChange}
            />
            <label>Completed</label>
          </div>
          <div className="flex justify-between">
            <button 
            type="button"
            onClick={() => navigate("/")}
            className=" bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Clear
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
             {isEdit ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    )
}

export default TaskForm;