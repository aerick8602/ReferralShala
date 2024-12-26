import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import EducationModal from "../models/EducationModel"; // Create this modal component separately.

const EducationWrapper = ({ education, onEdit, onDelete, onSave }) => {
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);

  const handleEdit = (educationId) => {
    const selectedEducation = education.find((edu) => edu.educationId === educationId);
    setCurrentEducation(selectedEducation);
    setIsEducationModalOpen(true); // Open modal
  };

  const handleSave = (updatedEducation) => {
    onSave(updatedEducation); // Call onSave prop to save the updated education
    setIsEducationModalOpen(false); // Close modal after saving
  };

  const handleDelete = (educationId) => {
    onDelete(educationId); // Call onDelete prop to delete the education entry
  };

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
              onClick={() => handleEdit(edu.educationId)} // Open modal for specific education
              className="text-blue-500 hover:text-blue-700"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => handleDelete(edu.educationId)} // Delete education entry
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {/* Conditional Modal Rendering for specific education */}
      {isEducationModalOpen && currentEducation && (
        <EducationModal
          toggleModal={() => setIsEducationModalOpen(false)} // Close modal
          education={currentEducation}
          onSave={handleSave} // Save updated education
        />
      )}
    </div>
  );
};

export default EducationWrapper;
