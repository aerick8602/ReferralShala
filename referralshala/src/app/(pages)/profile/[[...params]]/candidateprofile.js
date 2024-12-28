"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";
import PersonalCard from "../../../components/models/PersonalModel";
import ExperienceModel from "../../../components/models/ExperienceModel";
import EducationModel from "../../../components/models/EducationModel";
import DragnDrop from "../../../components/DragNDrop";
import {
  FaPencilAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "../../../styles/Profile.css";
import axios from "axios";
import { HashLoader } from "react-spinners";
import MultipleSelectChip from "../../../components/skills";

export default function CandidateProfile({ userId }) {
  const [userData, setUserData] = useState({});
  const [candidateData, setCandidateData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Single loader state
  const [skills, setSkills] = useState([]);
  const [file, setFile] = useState(null);

  const handleFilesSelected = (selectedFile) => {
    setFile(selectedFile);
  };
  const handleUpload = async () => {
    console.log("hey i am here");
    // e.preventDefault();
    console.log(file);

    if (file) {
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);
      console.log(formDataToUpload);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToUpload,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      const imagePath = result.filePath;
      console.log("imagePath", imagePath);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [userRes, candidateRes, educationRes, experienceRes] =
        await Promise.all([
          fetch(`/api/user/profile/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(`/api/user/profile/${userId}/candidate`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(`/api/user/profile/${userId}/education`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(`/api/user/profile/${userId}/experience`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

      if (
        !userRes.ok ||
        !candidateRes.ok ||
        !educationRes.ok ||
        !experienceRes.ok
      ) {
        throw new Error("Error fetching data");
      }

      const [userData, candidateData, educationData, experienceData] =
        await Promise.all([
          userRes.json(),
          candidateRes.json(),
          educationRes.json(),
          experienceRes.json(),
        ]);

      setUserData(userData.data);
      setCandidateData(candidateData.data);
      setSkills(candidateData.data.skills);
      setEducationData(educationData.data);
      setExperienceData(experienceData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEducationData = async (educationData) => {
    try {
      if (!userId) {
        console.error("User ID is missing");
        return;
      }

      const response = await fetch(`/api/user/profile/${userId}/education`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(educationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating education data:", error);
    }
  };

  const updateEducationData = async (educationData) => {
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/education/${educationData.educationId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(educationData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  const deleteEducationData = async (educationId) => {
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/education/${educationId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Deletion successful:", data);
    } catch (error) {
      console.error("Error deleting education data:", error);
    }
  };

  const updateUserData = async (firstname, lastname, imageurl) => {
    try {
      const response = await fetch(`/api/user/profile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, imageurl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      return data;
    } catch (error) {
      console.log("Error updating candidate:", error);
      return null;
    }
  };

  const togglePersonalModel = () =>
    setIsPersonalModalOpen(!isPersonalModalOpen);
  const toggleEducationModel = () =>
    setIsEducationModalOpen(!isEducationModalOpen);
  const toggleExperienceModel = () =>
    setIsExperienceModalOpen(!isExperienceModalOpen);

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Navbar userId={userId} />
      <div className="profile">
        <div className="personal-data">
          <button onClick={togglePersonalModel} className="edit-button">
            <FaPencilAlt /> Edit
          </button>
          <div className="avatar">
            <img
              src={userData?.profileImage || "/user.png"}
              alt="Profile"
              className="avatar-img"
            />
          </div>
          <div className="details">
            <div className="info-item">
              <FaEnvelope />
              <p>{userData?.emailAddress || "Email not available"}</p>
            </div>
            <div className="info-item">
              <FaPhone />
              <p>{candidateData?.contactNumber || "Phone not available"}</p>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt />
              <p>{candidateData?.location || "Location not available"}</p>
            </div>
            <div className="social-links">
              <p>Social Links:</p>
              <ul>
                {candidateData?.socialLinks?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={
                        link.link.startsWith("https://")
                          ? link.link
                          : `https://${link.link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="main-profile">
          <div className="education-section">
            <div className="my-2">
              <DragnDrop
                onFilesSelected={handleFilesSelected}
                width="100%"
                height="200px"
              />{" "}
              {/* Add DragNdrop component here */}
            </div>
            <div className="flex flex-row justify-center">
              <button
                className="py-1 px-4 w-16 bg-sky-500 text-white rounded-lg mt-4 hover:bg-sky-600 transition-colors"
                onClick={handleUpload}
              >
                Save
              </button>
            </div>
            <div>
              <label>Skills</label>
              <MultipleSelectChip></MultipleSelectChip>
              <div>
                {skills.map((skill, index) => {
                  return <p key={index}>{skill}</p>;
                })}
              </div>
            </div>
          </div>
          <div className="education-section">
            {educationData.length > 0 ? (
              <div>
                <label>Education Details</label>
                <EducationWrapper
                  educationData={educationData}
                  setEducationData={setEducationData}
                  updateEducationData={updateEducationData}
                  deleteEducationData={deleteEducationData}
                />
              </div>
            ) : (
              <p>No education data available.</p>
            )}

            {experienceData.length > 0 ? (
              <div>
                <label>Experience Details</label>
                <ExperienceWrapper
                  experiences={experienceData}
                  setExperienceData={setExperienceData}
                />
              </div>
            ) : (
              <p>No experience data available.</p>
            )}
            <p onClick={toggleEducationModel}>Add Education Details</p>
            <p onClick={toggleExperienceModel}>Add Experience Details</p>
          </div>
        </div>

        {isPersonalModalOpen && (
          <div className="modal-backdrop" onClick={togglePersonalModel}>
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <PersonalCard
                userData={userData}
                candidateData={candidateData}
                setUserData={setUserData}
                setCandidateData={setCandidateData}
                togglePersonalModel={togglePersonalModel}
                updateUserData={updateUserData}
              />
            </div>
          </div>
        )}

        {isEducationModalOpen && (
          <div className="modal-backdrop" onClick={toggleEducationModel}>
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <EducationModel
                educationData={educationData}
                setEducationData={setEducationData}
                addEducationData={addEducationData}
                toggleEducationModel={toggleEducationModel}
              />
            </div>
          </div>
        )}

        {isExperienceModalOpen && (
          <div className="modal-backdrop" onClick={toggleExperienceModel}>
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <ExperienceModel
                experienceData={experienceData}
                setExperienceData={setExperienceData}
                toggleExperienceModel={toggleExperienceModel}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
