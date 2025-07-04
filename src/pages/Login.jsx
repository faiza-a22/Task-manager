import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/authService";
const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials((prev) => ({...prev, [name]: value}));
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

    try {
      const res = await loginUser(credentials);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid email or password.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to Task Master</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
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
