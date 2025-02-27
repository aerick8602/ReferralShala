import React, { useState, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
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

  const toggleEducationModel = () =>
    setIsEducationModalOpen(!isEducationModalOpen);

  const handleEdit = (educationId) => {
    const selectedEducation = educationData.find(
      (edu) => edu.educationId === educationId
    );
    setCurrentEducation(selectedEducation);
    toggleEducationModel();
  };

  const confirmDelete = (educationId) => {
    confirmDialog({
      message: "Are you sure you want to delete this education entry?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => handleDelete(educationId),
    });
  };

  const handleDelete = async (educationId) => {
    const updatedEducationData = educationData.filter(
      (edu) => edu.educationId !== educationId
    );
    setEducationData(updatedEducationData);
    await deleteEducationData(educationId);
  };

  return (
    <div className="education-wrapper">
      <ConfirmDialog />
      {educationData?.map((edu) => (
        <div key={edu.educationId} className="education-card">
          <div className="education-title">{edu.instituteName}</div>
          <p className="education-details">
            {edu.degree} in{" "}
            <span className="education-stream">{edu.stream}</span>
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
                <i className="pi pi-pencil"></i>
              </button>
              <button
                onClick={() => confirmDelete(edu.educationId)}
                className="delete-btn"
                title="Delete Education"
              >
                <i className="pi pi-trash"></i>
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
