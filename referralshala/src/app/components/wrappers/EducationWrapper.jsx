import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
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

  const toggleEducationModel = () => setIsEducationModalOpen(!isEducationModalOpen);

  const handleEdit = async (educationId) => {
    const selectedEducation = educationData.find((edu) => edu.educationId === educationId);
    setCurrentEducation(selectedEducation);
    toggleEducationModel();
  };

  const handleDelete = async (educationId) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      const updatedEducationData = educationData.filter((edu) => edu.educationId !== educationId);
      setEducationData(updatedEducationData);
      await deleteEducationData(educationId); 
    }
  };
  return (
    <div className="flex flex-col gap-4 w-11/12 m-auto">
      {educationData.map((edu) => (
        <div
          key={edu.educationId}
          className="border p-4 rounded-lg shadow-lg bg-white relative w-full"
        >
          <h3 className="text-lg font-bold">{edu.instituteName}</h3>
          <p className="text-sm text-gray-600">
            {edu.degree} in {edu.stream}
          </p>
          <p className="text-sm text-gray-600">
            {edu.startYear} -{" "}
            {edu.endYear || (edu.isCurrentlyEducating ? "Present" : "N/A")}
          </p>
          <p className="text-sm text-gray-600">
            {edu.grade?.percentage
              ? `Percentage: ${edu.grade?.percentage}%`
              : `CGPA: ${edu.grade?.cgpa}`}
          </p>
         {
          isauth?( <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => handleEdit(edu.educationId)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => handleDelete(edu.educationId)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>):(<></>)
         }
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
