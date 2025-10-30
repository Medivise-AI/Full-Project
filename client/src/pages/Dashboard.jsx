import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientCard from "../components/PatientCard";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode"; // تأكد انك مثبت jwt-decode

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    contact: "",
    medical_history: "",
    notes: "",
    doctor_id: "",
  });
  const [formLoading, setFormLoading] = useState(false);

  // جلب doctor_id من التوكن
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      setFormData((prev) => ({ ...prev, doctor_id: decoded.id }));
    }
  }, []);

  // جلب المرضى
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/patients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPatients(response.data.patients);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load patients");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/patients",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        setPatients([...patients, response.data.patient]);
        setShowAdd(false);
        setFormData({
          name: "",
          dob: "",
          gender: "",
          contact: "",
          medical_history: "",
          notes: "",
          doctor_id: formData.doctor_id,
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to add patient.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-28 pb-16 px-4 transition-colors duration-500">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-blue-100 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-4xl">📋</span>
            <span>MEDIVISE - Patients Dashboard</span>
          </h2>

          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md shadow-md hover:shadow-lg transition"
          >
            ➕ Add New Patient
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            Loading patients...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {patients.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <PatientCard patient={p} />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-6">
          <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 shadow-2xl rounded-3xl border border-blue-100 dark:border-gray-700 p-10">
            <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6 flex items-center gap-2">
              ➕ Add New Patient
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Medical History
                </label>
                <textarea
                  name="medical_history"
                  value={formData.medical_history}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Doctor’s Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {formLoading ? "Adding..." : "Add Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
