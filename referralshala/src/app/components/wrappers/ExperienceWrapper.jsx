import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
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

  const toggleExperienceModel = () => setIsExperienceModalOpen(!isExperienceModalOpen);

  const handleEdit = (experienceId) => {
    const selectedExperience = experienceData.find((exp) => exp.experienceId === experienceId);
    setCurrentExperience(selectedExperience);
    toggleExperienceModel();
  };

  const handleDelete = async (experienceId) => {

      if (confirm("Are you sure you want to delete this entry?")) {
        const updateExperienceData = experienceData.filter((exp) => exp.experienceId !== experienceId);
        setExperienceData(updateExperienceData);
        await deleteExperienceData(experienceId); 
      }
  };

  return (
    <div className="flex flex-col gap-4 w-11/12 m-auto">
      {experienceData?.map((exp) => (
        <div
          key={exp.experienceId}
          className="border p-4 rounded-lg shadow-lg bg-white relative w-full"
        >
          <h3 className="text-lg font-bold">{exp.companyName}</h3>
          <p className="text-sm text-gray-600">{exp.role}</p>
          <p className="text-sm text-gray-600">{exp.location}</p>
          <p className="text-sm text-gray-600">
            {exp.startYear} - {exp.endYear || (exp.isCurrentlyEmployed ? "Present" : "N/A")}
          </p>
          {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
          {isauth?(<div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => handleEdit(exp.experienceId)} // Open modal for specific experience
              className="text-blue-500 hover:text-blue-700"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => handleDelete(exp.experienceId)} // Delete experience entry
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>):(<></>)}
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
