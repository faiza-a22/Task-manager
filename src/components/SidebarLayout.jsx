import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu} from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider, Content} = Layout;

function SidebarLayout({children}) {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
                        {key:'dashboard',label: <Link to="/dashboard" >Dashboard</Link>,icon: <DashboardOutlined />},
                        {key:'manage tasks', label: <Link to="/tasks" >Manage Tasks</Link> , icon:<UnorderedListOutlined/>},
                        {key: 'settings', label: 'Settings', icon:<SettingOutlined />},
                        {key: 'logout',icon: <LogoutOutlined />,label:<Link to="/logout" >Logout</Link>}
                    ];

    return (
            <Layout className="">
                <Sider collapsible collapsed={isOpen} onCollapse={(value) => setIsOpen(value)} breakpoint="md" collapsedWidth="0" className="
                bg-gray-800 min-h-screen
                ">
                    <div className="text-white text-center text-xl font-bold py-4">
                        {!isOpen && "Task Manager"}
                    </div>

                    <Menu theme="dark" className="h-full" items={menuItems}/>
                </Sider>

                <Layout>
                    <Content className="bg-gray-100 p-6 h-full">
                        {children}
                    </Content>
                </Layout>
            </Layout>  
    )
}

export default SidebarLayout;