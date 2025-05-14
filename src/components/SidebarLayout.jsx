import { useState } from "react";
import { Link } from "react-router-dom";

function SidebarLayout({children}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
            <div className="flex min-h-screen bg-gray-100">
                <div className={`
                bg-gray-800 text-white p-4 space-y-4
                fixed md:relative z-40 w-64 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
                `}>
                    <h2 className="text-xl font-bold mb-6">Task Manager</h2>
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="hover:bg-gray-700 p-2 rounded">🏠 Dashboard</Link>
                        <Link to="/add-task" className="hover:bg-gray-700 p-2 rounded">➕ Add Task</Link>
                        <button className="text-left hover:bg-gray-700 p-2 rounded">⚙️ Settings</button>
                        <button className="text-left hover:bg-gray-700 p-2 rounded">🚪 Logout</button>
                    </div>
                    {isOpen && (
                        <div
                        className="fixed inset-0   bg-opacity-30 z-30 md:hidden"
                        onClick={() => setIsOpen(false)}
                        />
                    )}
                </div>
                <div className="flex-1 bg-gray-100 p-6 ">
                    <button
                    className="md:hidden mb-4 bg-gray-800 text-white px-4 py-2 rounded"
                    onClick={() => setIsOpen(!isOpen)}
                    >
                    ☰ Menu
                    </button>

                    {children}
                </div>
            </div>   
    )
}

export default SidebarLayout;