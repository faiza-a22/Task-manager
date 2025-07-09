import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      setIsLoggingOut(false);
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/dashboard");
    setIsLoggingOut(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Log Out?</h2>
          <p className="text-gray-600 mb-8">
            Are you sure you want to sign out? You'll need to log in again to access your account.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCancel}
              disabled={isLoggingOut}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 shadow-sm disabled:opacity-50"
            >
              {isLoggingOut ? "Logging out..." : "Yes, Log Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
