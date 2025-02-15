import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import ExperienceModel from "../models/ExperienceModel";
import "../../styles/ExperienceWrapper.css";

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
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updatedExperienceData = experienceData.filter(
        (exp) => exp.experienceId !== experienceId
      );
      setExperienceData(updatedExperienceData);
      await deleteExperienceData(experienceId);
    }
  };

  return (
    <div className="experience-wrapper">
      {experienceData?.map((exp) => (
        <div key={exp.experienceId} className="experience-card">
          <div className="experience-title">{exp.companyName}</div>
          <p className="experience-details">
            <span className="experience-label">Role:</span> {exp.role}
          </p>
          <p className="experience-details">
            <span className="experience-label">Location:</span> {exp.location}
          </p>
          <p className="experience-details">
            <span className="experience-label">Duration:</span> {exp.startYear} -{" "}
            {exp.endYear || (exp.isCurrentlyEmployed ? "Present" : "N/A")}
          </p>
          {exp.description && <p className="experience-description">{exp.description}</p>}

          {isauth && (
            <div className="experience-actions">
              <button
                onClick={() => handleEdit(exp.experienceId)}
                className="edit-btn"
                title="Edit Experience"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDelete(exp.experienceId)}
                className="delete-btn"
                title="Delete Experience"
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>
      ))}

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
