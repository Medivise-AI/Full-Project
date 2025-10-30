import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios"; 
import "./LoginRegister.css";



function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:5000/api/doctors/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        window.location.href = "/dashboard"; 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("http://localhost:5000/api/doctors/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
      alert("Account created successfully! Please login.");
      setIsLogin(true);
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 border border-gray-400 dark:border-gray-600 text-sm px-3 py-1.5 rounded-md hover:bg-white/20 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <motion.div
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-blue-100 dark:border-gray-700 transition-colors duration-500"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="/doctor-logo.png"
            alt="MEDIVISE - AI Doctor Logo"
            className="w-24 h-24 object-contain mb-2"
          />
          <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-300 mt-1">
            MEDIVISE - AI
          </h1>
        </div>

        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
          {isLogin ? "Doctor Login" : "Doctor Registration"}
        </h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          onClick={toggleForm}
          className="text-center text-blue-600 dark:text-blue-400 mt-6 cursor-pointer hover:underline transition"
        >
          {isLogin
            ? "Don’t have an account? Register here"
            : "Already registered? Login here"}
        </p>
      </motion.div>
    </div>
  );
}

export default LoginRegister;
