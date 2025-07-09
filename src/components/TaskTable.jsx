import { Table, Popconfirm, Button } from "antd";
import { Link } from "react-router-dom";

function TaskTable({ tasks, onDelete }) {
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
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isCompleted",
      key: "isCompleted",
      render: (value) => (
        <span className="capitalize">
          {value ? "Completed" : "Not Completed"}
        </span>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
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
      dataIndex: "deadline",
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
    {
      title: "Actions",
      render: (_, task) => (
        <div className="flex gap-2">
          <Link to={`/edit-task/${task.id}`}>
            <Button type="primary" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
              Edit
            </Button>
          </Link>

          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => onDelete(task.id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default TaskTable;
