import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import EducationModal from "../../components/models/EducationModel";
import "../../styles/EducationWrapper.css";

const EducationWrapper = ({
  isauth,
  educationData,
  setEducationData,
  updateEducationData,
  deleteEducationData,
}) => {
  const [currentEducation, setCurrentEducation] = useState(null);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  const toggleEducationModel = () => setIsEducationModalOpen(!isEducationModalOpen);

  const handleEdit = (educationId) => {
    const selectedEducation = educationData.find(
      (edu) => edu.educationId === educationId
    );
    setCurrentEducation(selectedEducation);
    toggleEducationModel();
  };

  const handleDelete = async (educationId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updatedEducationData = educationData.filter(
        (edu) => edu.educationId !== educationId
      );
      setEducationData(updatedEducationData);
      await deleteEducationData(educationId);
    }
  };

  return (
    <div className="education-wrapper">
      {educationData.map((edu) => (
        <div key={edu.educationId} className="education-card">
          <div className="education-title">{edu.instituteName}</div>
          <p className="education-details">
            {edu.degree} in <span className="education-stream">{edu.stream}</span>
          </p>
          <p className="education-details">
            <span className="education-label">Years:</span> {edu.startYear} -{" "}
            {edu.endYear || (edu.isCurrentlyEducating ? "Present" : "N/A")}
          </p>
          <p className="education-details">
            <span className="education-label">Grade:</span>{" "}
            {edu.grade?.percentage
              ? `Percentage: ${edu.grade?.percentage}%`
              : `CGPA: ${edu.grade?.cgpa}`}
          </p>
          {isauth && (
            <div className="education-actions">
              <button
                onClick={() => handleEdit(edu.educationId)}
                className="edit-btn"
                title="Edit Education"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDelete(edu.educationId)}
                className="delete-btn"
                title="Delete Education"
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>
      ))}

      {isEducationModalOpen && (
        <EducationModal
          educationData={educationData}
          setEducationData={setEducationData}
          currentEducation={currentEducation}
          toggleEducationModel={toggleEducationModel}
          updateEducationData={updateEducationData}
        />
      )}
    </div>
  );
};

export default EducationWrapper;
