import React, { useState } from "react";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import ExperienceModel from "../models/ExperienceModel"; // Create this modal component separately.

const ExperienceWrapper = ({
  isauth,
  experienceData,
  setExperienceData,
  updateExperienceData,
  deleteExperienceData,
}) => {
  const [currentExperience, setCurrentExperience] = useState(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  const toggleExperienceModel = () =>
    setIsExperienceModalOpen(!isExperienceModalOpen);

  const handleEdit = (experienceId) => {
    const selectedExperience = experienceData.find(
      (exp) => exp.experienceId === experienceId
    );
    setCurrentExperience(selectedExperience);
    toggleExperienceModel();
  };

  const handleDelete = async (experienceId) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      const updatedExperienceData = experienceData.filter(
        (exp) => exp.experienceId !== experienceId
      );
      setExperienceData(updatedExperienceData);
      await deleteExperienceData(experienceId);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-11/12 m-auto">
      {experienceData?.map((exp) => (
        <div
          key={exp.experienceId}
          className="border p-4 rounded-lg relative w-full"
          style={{ border: "1px solid rgb(247, 88, 88,0.3)" }}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {exp.companyName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Role:</span> {exp.role}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Location:</span> {exp.location}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Duration:</span> {exp.startYear} -{" "}
            {exp.endYear || (exp.isCurrentlyEmployed ? "Present" : "N/A")}
          </p>
          {exp.description && (
            <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
          )}
          {isauth && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(exp.experienceId)}
                className="p-2 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                title="Edit Experience"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDelete(exp.experienceId)}
                className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                title="Delete Experience"
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Conditional Modal Rendering for specific experience */}
      {isExperienceModalOpen && currentExperience && (
        <ExperienceModel
          experienceData={experienceData}
          currentExperience={currentExperience}
          setExperienceData={setExperienceData}
          toggleExperienceModel={toggleExperienceModel}
          updateExperienceData={updateExperienceData}
        />
      )}
    </div>
  );
};

export default ExperienceWrapper;
