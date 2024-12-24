import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const EducationWrapper = ({ education, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-4 w-11/12 m-auto">
      {education.map((edu) => (
        <div
          key={edu.educationId}
          className="border p-4 rounded-lg shadow-lg bg-white relative w-full"
        >
          <h3 className="text-lg font-bold">{edu.instituteName}</h3>
          <p className="text-sm text-gray-600">
            {edu.degree} in {edu.stream}
          </p>
          <p className="text-sm text-gray-600">
            {edu.startYear} - {edu.endYear || edu.isCurrentlyEducating ? "Present" : "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            {edu.grade.percentage ? `Percentage: ${edu.grade.percentage}%` : `CGPA: ${edu.grade.CGPA}`}
          </p>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => onEdit(edu.educationId)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => onDelete(edu.educationId)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationWrapper;
