import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginRegister from "./pages/LoginRegister";
import Dashboard from "./pages/Dashboard";
import PatientProfile from "./pages/PatientProfile";
//import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

// مكوّن وسيط لإخفاء الـ Navbar في بعض الصفحات
function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // يخفي الـ Navbar في صفحة تسجيل الدخول فقط
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginRegister />} />

          <Route
            path="/dashboard"
            element={
              //<PrivateRoute>
                <Dashboard />
              //</PrivateRoute>
            }
          />

          <Route path="/patients/:patientId" element={<PatientProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
