import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ExperienceWrapper = ({ experiences, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-4 w-11/12 m-auto">
      {experiences.map((exp) => (
        <div
          key={exp.experienceId}
          className="border p-4 rounded-lg shadow-lg bg-white relative w-full"
        >
          <h3 className="text-lg font-bold">{exp.companyName}</h3>
          <p className="text-sm text-gray-600">
            {exp.role}
          </p>
          <p className="text-sm text-gray-600">
            {exp.location}
          </p>
          <p className="text-sm text-gray-600">
            {exp.startYear} - {exp.endYear || exp.isCurrentlyEmployed ? "Present" : "N/A"}
          </p>
          {exp.description && (
            <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
          )}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => onEdit(exp.experienceId)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => onDelete(exp.experienceId)}
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

export default ExperienceWrapper;
