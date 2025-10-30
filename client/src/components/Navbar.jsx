import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
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

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    setLoading(true);
    navigate("/");
  };
  
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 dark:bg-gray-900 text-white py-4 shadow-lg z-50 transition-colors duration-300">
      <div className="w-full flex justify-between items-center px-6 sm:px-10 md:px-16 font-manrope">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <img
            src="/doctor-logo.png"
            alt="MEDIVISE AI"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-extrabold tracking-wide">
            MEDIVISE
            <span className="text-blue-200 dark:text-blue-400"> AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-white/90 hover:text-white dark:text-gray-300 dark:hover:text-white transition"
          >
            Dashboard
          </Link>

          {}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-1 border border-white/40 px-3 py-1.5 rounded-md text-sm hover:bg-white/20 dark:hover:bg-gray-700 transition-all duration-200"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {}
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`bg-white text-blue-600 px-4 py-1.5 rounded-md font-semibold hover:bg-blue-100 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 transition-all duration-200  ${
              loading && "opacity-60 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
}
