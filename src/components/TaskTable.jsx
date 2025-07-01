import TaskRow from './TaskRow';
import { Table } from 'antd';

function TaskTable ({tasks, onDelete}) {
  const columns = [
    {
      title: "S/N",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Status",
      dataIndex: "isCompleted",
      key: "isCompleted",
      render: (value) => (
        <span className="capitalize">{value ? "Completed" : "Not Completed"}</span>
      ),
    },
    {
      title: "Priority",
      dataIndex:"priority",
      key: "priority",
      render: (priority) =>
        priority === 1
          ? "Low"
          : priority === 2
          ? "Normal"
          : priority === 3
          ? "High"
          : "Unknown",
    },
    {
      title: "Deadline",
      dataIndex:"deadline",
      key: "deadline",
      render: (value) =>
        new Date(value).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
    },
    // {
    //   title:"Actions",
    //   key:"actions",
    //   render: (_, record) => <TaskRow task={record} onDelete={onDelete} />,
    // },
  ]
  
  return (
    <div className='overflow-x-auto w-full'>
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
    
    // <div className="overflow-x-auto w-full">
    //   <table className="min-w-full">
    //     <thead>
    //       <tr className="border-y border-gray-300 bg-gray-100">
    //         {/* <th className="mx-1 px-4 py-2 rounded">ID</th> */}
    //         <th className=" mx-1 px-4 py-2 rounded">S/N</th>
    //         <th className=" mx-1 px-4 py-2 rounded">Title</th>
    //         <th className="mx-1 px-4 py-2 rounded">Description</th>
    //         <th className="mx-1 px-4 py-2 rounded text-center">Status</th>
    //         <th className="mx-1 px-4 py-2 rounded text-center">Priority</th>
    //         <th className="mx-1 px-4 py-2 rounded">Deadline</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {tasks.map((task, index) => (
    //         <TaskRow key={task.id} task={task} onDelete={onDelete} index={index} />
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default TaskTable;