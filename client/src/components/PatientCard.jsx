import React from "react";
import { useNavigate } from "react-router-dom";

function PatientCard({ patient }) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/patients/${patient.id}`);
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">
        {patient.name}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Sex:</strong> {patient.gender}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Condition:</strong> {patient.medical_history}
      </p>
      <button
        onClick={handleViewProfile}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Profile
      </button>
    </div>
  );
}

export default PatientCard;
