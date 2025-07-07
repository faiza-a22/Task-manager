import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts"
import useFetchTasks from '../hooks/useFetchTasks';
import { useNavigate } from "react-router-dom";
import { Spin, Typography, Card, Divider } from "antd";

const { Title } = Typography;

function Dashboard () {
    const navigate = useNavigate();
    const goToTasks = (filter) => {
      console.log("Navigating to:", filter);
      navigate(`/tasks?filter=${filter}`, { replace: false });
    };
    const {tasks,loading} =  useFetchTasks();
    const total = tasks.length;
    const completed = tasks.filter((task) => task.isCompleted).length;
    const notCompleted = total - completed;
    const getTasksPerMonth = (tasks) => {
    const monthMap = {
      0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr",
      4: "May", 5: "Jun", 6: "Jul", 7: "Aug",
      8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"
    };

  const monthlyCount = {};

  tasks.forEach((task) => {
    const monthIndex = new Date(task.deadline).getMonth();
    const monthName = monthMap[monthIndex];

    if (monthlyCount[monthName]) {
      monthlyCount[monthName]++;
    } else {
      monthlyCount[monthName] = 1;
    }
  });

  return Object.entries(monthlyCount).map(([month, count]) => ({
    month,
    tasks: count,
  }));
  };
const chartData = getTasksPerMonth(tasks);
    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
      <Title className="!mb-6">Dashboard Overview</Title>
      <Divider />
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin tip="Loading stats..." size="large" />
        </div>
      ) : (
        <>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Card
              hoverable
              onClick={() => goToTasks("all")}
              className="cursor-pointer hover:scale-105 transition-transform group"
            >
                <div className="text-xl font-semibold group-hover:text-blue-700 transition-colors">📋 Total Tasks</div>
                <Title level={2} className="!text-blue-600 mt-2 mb-0">{total}</Title>
            </Card>

            <Card
              hoverable
              onClick={() => goToTasks("completed")}
              className="cursor-pointer hover:scale-105 transition-transform group"
            >
              <div className="text-xl font-semibold group-hover:text-blue-700 transition-colors">✅ Completed Tasks</div>
              <Title level={2} className="!text-green-600 mt-2 mb-0">{completed}</Title>
            </Card>

            <Card
              hoverable
              onClick={() => goToTasks("pending")}
              className="cursor-pointer hover:scale-105 transition-transform group"
            >
              <div className="text-xl font-semibold group-hover:text-blue-700 transition-colors">🕓 Pending Tasks</div>
              <Title level={2} className="!text-red-600 mt-2 mb-0">{notCompleted}</Title>
            </Card>
        </div>
        <div className="bg-white rounded shadow p-6 mt-6">
          <div className="p-6">
            <Title className="mb-4">📊 Tasks by Month</Title>
            <Divider className="mb-4"/>
            <figure>
              <ResponsiveContainer width="100%" height={300} >
                <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis type="category" dataKey="month" />
                  <XAxis type="number" allowDecimals={false}  />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#3182ce" />
                </BarChart>
              </ResponsiveContainer>            
            </figure>
          </div>
        </div>
        
        </>
      )}
    </div>
    )
}

export default Dashboard;