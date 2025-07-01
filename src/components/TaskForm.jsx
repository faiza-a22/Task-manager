import { useNavigate } from "react-router-dom";

import {
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Button,
  Typography,
  Space,
} from "antd";

import dayjs from "dayjs";

const { TextArea } = Input;
const { Title } = Typography;

const TaskForm = ({task, onChange, onSubmit, isEdit}) => {
  const navigate = useNavigate();
    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
          <Title>{isEdit ? "Edit Task" : "Create Task"}</Title>
          <Form onFinish={onSubmit} layout="vertical">
            <Form.Item label="Title" required>
              <Input
                name="title"
                value={task.title}
                onChange={onChange}
                placeholder="Title"
              />
            </Form.Item>
            <Form.Item label="Description" required>
              <TextArea
                name="description"
                value={task.description}
                onChange={onChange}
                placeholder="Description"
                autoSize={{minRows: 3}}
              />
            </Form.Item>
            <Form.Item label="Priority">
              <Select
                name="priority"
                value={task.priority}
                onChange={(value) => onChange({ target: { name: "priority", value } })}
              >
                <Select.Option value="1">Low</Select.Option>
                <Select.Option value="2">Medium</Select.Option>
                <Select.Option value="3">High</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Deadline" required>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                name="deadline"
                value={task.deadline ? dayjs(task.deadline) : null}
                onChange={(dateString) =>
                  onChange({ target: { name: "deadline", value: dateString } })
                }
                className="w-full"
              />
            </Form.Item>
            <Form.Item>
              <Checkbox
               name="checkbox"
               checked={task.isCompleted}
               onChange={(e) =>
    onChange({
      target: { name: "isCompleted", value: e.target.checked }
    })
  }
              >
                Completed
              </Checkbox>
            </Form.Item>
            <Form.Item className="flex justify-between">
              <Space >
                <Button color="danger" variant="solid"  onClick={() => navigate("/tasks")}>Exit</Button>
                <Button color="primary" variant="solid" htmlType="button"  onClick={onSubmit}>{isEdit ? "Edit Task" : "Create Task"}</Button>
              </Space>
            </Form.Item>
          </Form>
      </div>
    )
}

export default TaskForm;