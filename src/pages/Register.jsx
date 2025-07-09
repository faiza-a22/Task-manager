import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authService";
import { toast } from "react-toastify";

const Register = () => {
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
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(""); // Clear error on input change
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password.length < 8) {
      return toast.error("Password must be at least 8 characters", toastConfig);
    }

    if (form.password !== form.confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match", toastConfig);
    }

    try {
      await registerUser({
        email: form.email,
        password: form.password,
      });
      navigate("/login");
      toast.success("Registration successful! Please login.", toastConfig);
    } catch (err) {
      if (err.response?.status === 409) {
        // 409 Conflict is common for duplicate entries
        toast.error("Email already exists. Please use a different email.", toastConfig);
      }
      console.error("Registration error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.", toastConfig);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white py-2 rounded transition`}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
