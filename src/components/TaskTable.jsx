import TaskRow from './TaskRow';

function TaskTable ({tasks, onDelete}) {
  
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full">
        <thead>
          <tr className="border-y border-gray-300 bg-gray-100">
            <th className="mx-1 px-4 py-2 rounded">ID</th>
            <th className=" mx-1 px-4 py-2 rounded">Title</th>
            <th className="mx-1 px-4 py-2 rounded">Description</th>
            <th className="mx-1 px-4 py-2 rounded text-center">Completed</th>
            <th className="mx-1 px-4 py-2 rounded text-center">Priority</th>
            <th className="mx-1 px-4 py-2 rounded">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskTable;