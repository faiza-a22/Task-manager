import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials((prev) => ({...prev, [name]: value}));
    };
    const handleLogin = (e) => {
        e.preventDefault();

        //hardcoded user
        if (credentials.username === "admin" && credentials.password === "password") {
             localStorage.setItem("user", JSON.stringify({ username: credentials.username }));
             navigate("/dashboard");
        } else {
            setError("invalid username or password")
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to Task Master</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 "
            >
                Login
            </button>
          
        </form>

        <div className="mt-4 text-center text-sm">
          Don't have an account yet?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
