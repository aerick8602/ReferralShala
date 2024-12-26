"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";
import PersonalCard from "../../../components/models/PersonalModel";
import ExperienceModel from "../../../components/models/ExperienceModel";
import EducationModel from "../../../components/models/EducationModel";
import {
  FaPencilAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "../../../styles/Profile.css";
import axios from "axios";


export default function CandidateProfile({ userId }) {
  const [userData, setUserData] = useState({});
  const [candidateData, setCandidateData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      // Log the response data
      console.log("User Data Response:", data);

      setUserData(data.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const fetchCandidateData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/candidate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! in candidate status: ${res.status}`);
      }
      const data = await res.json();

      // Log the response data
      console.log("Candidate Data Response:", data);

      setCandidateData(data.data);
    } catch (error) {
      console.log("Error fetching candidate data", error);
    }
  };

  const fetchEducationData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/education`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! in fetchEducation status: ${res.status}`);
      }
      const data = await res.json();

      // Log the response data
      console.log("Education Data Response:", data);

      setEducationData(data.data);
    } catch (error) {
      console.log("Error fetching education data", error);
    }
  };

  const fetchExperienceData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/experience`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! in fetchExperience status: ${res.status}`);
      }
      const data = await res.json();

      // Log the response data
      console.log("Experience Data Response:", data);

      setExperienceData(data.data);
    } catch (error) {
      console.log("Error fetching experience data", error);
    }
  };

  const addEducationData = async (formData) => {
    try {
      // Constructing the request body
      const body = {
        instituteName: formData.instituteName,
        degree: formData.degree,
        stream: formData.stream,
        startYear: formData.startYear,
        endYear: formData.endYear || null, // Set null if not provided
        isCurrentlyEducating: formData.isCurrentlyEducating,
        grade: {
          Percentage: formData.gradePercentage || null, // Default to null if missing
          CGPA: formData.gradeCGPA || null, // Default to null if missing
        },
      };
  
      console.log('Request Body:', body);
  
      // Sending the POST request
      const response = await axios.post(`/api/user/profile/${userId}/education`, body);
      console.log('Education formData added:', response.data);
    } catch (error) {
      // Handling errors
      console.error('Error adding education formData:', error.response?.data || error.message);
    }
  };
  


  

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchCandidateData();
      fetchEducationData();
      fetchExperienceData();
    }
  }, [userId]);

  const togglePersonalModel = () => {
    setIsPersonalModalOpen((prev) => !prev);
  };
  const toggleEducationModel = () => {
    setIsEducationModalOpen((prev) => !prev);
  };
  const toggleExperienceModel = () => {
    setIsExperienceModalOpen((prev) => !prev);
  };


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
              src={userData?.profileImage || "/path-to-avatar.jpg"}
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
            {educationData.length > 0 ? (
              <div>
                <label>Education Details</label>
                <EducationWrapper education={educationData}  />
              </div>
            ) : (
              <p>No education data available.</p>
            )}

            {experienceData.length > 0 ? (
              <div>
                <label>Experience Details</label>
                <ExperienceWrapper experiences={experienceData} />
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
                setIsPersonalModalOpen={setIsPersonalModalOpen}
                toggleModal={togglePersonalModel}
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
                toggleModal={() => setIsEducationModalOpen(false)} 
                addEducationData={addEducationData}
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
                toggleModal={() => setIsExperienceModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
