import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import EducationModal from "../../components/models/EducationModel";

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

  const handleEdit = async (educationId) => {
    const selectedEducation = educationData.find(
      (edu) => edu.educationId === educationId
    );
    setCurrentEducation(selectedEducation);
    toggleEducationModel();
  };

  const handleDelete = async (educationId) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      const updatedEducationData = educationData.filter(
        (edu) => edu.educationId !== educationId
      );
      setEducationData(updatedEducationData);
      await deleteEducationData(educationId);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-11/12 m-auto">
      {educationData.map((edu) => (
        <div
          key={edu.educationId}
          className="border p-4 rounded-lg relative w-full"
          style={{ border: "1px solid rgb(247, 88, 88,0.3)" }}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {edu.instituteName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {edu.degree} in <span className="font-medium">{edu.stream}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Years:</span> {edu.startYear} -{" "}
            {edu.endYear || (edu.isCurrentlyEducating ? "Present" : "N/A")}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Grade:</span>{" "}
            {edu.grade?.percentage
              ? `Percentage: ${edu.grade?.percentage}%`
              : `CGPA: ${edu.grade?.cgpa}`}
          </p>
          {isauth && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(edu.educationId)}
                className="p-2 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                title="Edit Education"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDelete(edu.educationId)}
                className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                title="Delete Education"
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Conditional Modal Rendering */}
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
