import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {
  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials((prev) => ({...prev, [name]: value}));
    };
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (!credentials.email || !credentials.password) {
            return toast.error("Please fill in all fields", toastConfig);
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
            return toast.error("Please enter a valid email address", toastConfig);
        }
      setError("");
        
      try {
        const res = await axios.post("https://test.xpresspayments.com:9000/login", {
        email: credentials.email,
        password: credentials.password,
      });

        const token = res.data.accessToken;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify({ email: credentials.email }));
          toast.success('Login successful!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/dashboard");
        } else {
          setError("Login failed: no token received");
        }
      
      } catch (err) {
        console.error("Login error:", err);
        const errorMessage = err.response?.data?.message || "Invalid email or password. Please try again.";
        toast.error(errorMessage, toastConfig);
      } finally {
        setLoading(false); 
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
              disabled={loading || !credentials.email || !credentials.password}
              className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded transition flex justify-center items-center`}
              >
                  {loading ? 'Processing...' : 'Login'}
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
