"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";
import PersonalCard from "../../../components/models/PersonalModel";
import ExperienceModel from "../../../components/models/ExperienceModel";
import EducationModel from "../../../components/models/EducationModel";
import DragnDrop from "../../../components/DragnDrop";
import Footer from "../../../components/Footer";

import {
  FaPencilAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaTimes,
  FaTrashAlt,
  FaPlus,
  FaStar,
} from "react-icons/fa";
import "../../../styles/Profile.css";
import { HashLoader } from "react-spinners";
import SkillSet from "../../../components/MultiSelect";
import Divider from "@mui/material/Divider";

export default function CandidateProfile({ userId, isauth }) {
  const [userData, setUserData] = useState({});
  const [candidateData, setCandidateData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Single loader state
  const [candidateSkills, setCandidateSkills] = useState([]);
  const [file, setFile] = useState(null);
  const [resumePath, setResumePath] = useState(null);

  /*####################  apis  #####################*/
  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("User Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  const fetchCandidateData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/candidate`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("Candidate Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      return null;
    }
  };
  const fetchEducationData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/education`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("Education Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching education data:", error);
      return null;
    }
  };
  const fetchExperienceData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/experience`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("Experinece Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching experience data:", error);
      return null;
    }
  };
  // Main function to fetch all data
  const fetchData = async () => {
    console.log("UserId :", userId);
    setIsLoading(true);
    try {
      const [userData, candidateData, educationData, experienceData] =
        await Promise.all([
          fetchUserData(userId),
          fetchCandidateData(userId),
          fetchEducationData(userId),
          fetchExperienceData(userId),
        ]);

      setUserData(userData);
      setCandidateData(candidateData);
      setCandidateSkills(candidateData.skills);
      setResumePath(candidateData.resume);
      setEducationData(educationData);
      setExperienceData(experienceData);
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
      return data;
    } catch (error) {
      console.error("Error updating education data:", error);
    }
  };
  const updateEducationData = async (educationData) => {
    console.log(educationData);
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
  const addExperienceData = async (experienceData) => {
    console.log("heloooo");
    console.log(experienceData);
    try {
      const response = await fetch(`/api/user/profile/${userId}/experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experienceData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      return data;
    } catch (error) {
      console.log("error adding exp", error);
    }
  };
  const updateExperienceData = async (experienceData) => {
    console.log(experienceData);
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/experience/${experienceData.experienceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(experienceData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "Update EXP successful: yeahhhhhhhhhhhhhhhhhhhhhhhhhhh",
        data
      );
      return data;
    } catch (error) {
      console.log("Error updating EXP", error);
      return null;
    }
  };
  const deleteExperienceData = async (experienceId) => {
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/experience/${experienceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("delete successful: deleteeeeeeeeeeeeee", data);
      return data;
    } catch (error) {
      console.log("Error deleting candidate:", error);
      return null;
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
  const updateCandidateData = async (experienceData) => {
    try {
      if (typeof experienceData !== "object" || experienceData === null) {
        throw new Error("experienceData must be a non-null object.");
      }
      const requestBody = {
        ...(experienceData.skills !== undefined && {
          skills: experienceData.skills,
        }),
        ...(experienceData.resume !== undefined && {
          resume: experienceData.resume,
        }),
        ...(experienceData.location !== undefined && {
          location: experienceData.location,
        }),
        ...(experienceData.contactNumber !== undefined && {
          contactNumber: experienceData.contactNumber,
        }),
        ...(experienceData.socialLinks !== undefined && {
          socialLinks: experienceData.socialLinks,
        }),
      };

      console.log("RequestBody:", requestBody);

      const response = await fetch(`/api/user/profile/${userId}/candidate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
  /*####################  apis  #####################*/

  const removeSkill = async (skillToRemove) => {
    // Remove the skill from the array
    const updatedSkills = candidateSkills.filter(
      (skill) => skill !== skillToRemove
    );

    // Update the state with the new skill set
    setCandidateSkills(updatedSkills);

    // Update the backend with the new skill set
    updateCandidateData({ skills: updatedSkills });
  };

  const handleFilesSelected = async (selectedFile) => {
    if (!selectedFile) return;
    console.log(selectedFile);
    setFile(selectedFile);
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
      console.log(result);
      const filePath = result.filePath;
      console.log("filePath", filePath);
      setResumePath(filePath);
      updateCandidateData({ resume: filePath });
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
      <h1
        style={{
          marginTop: "110px",
          marginBottom: "40px",
          width: "100%",
          fontSize: "35px",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0.7",
          // marginLeft: "110px",
        }}
      >
        Profile
      </h1>
      <div className="profile">
        <div className="personal-data">
          <div className="avatar">
            <img
              src={userData?.profileImage || "/user.png"}
              alt="Profile"
              className="avatar-img"
            />
          </div>
          {isauth ? (
            <button className="edit-button">
              <FaPencilAlt onClick={togglePersonalModel} />
            </button>
          ) : (
            <></>
          )}
          <br></br>
          <div className="details">
            <div className="info-item">
              <div
                className="user-name"
                style={{
                  fontSize:
                    (userData?.firstName?.length || 0) +
                      (userData?.lastName?.length || 0) >
                    15
                      ? "large"
                      : "x-large",
                }}
              >
                {userData.firstName} {userData.lastName}
              </div>
            </div>
            <div className="info-item">
              {/* <FaEnvelope className="icon" /> */}
              <p
                style={{
                  color: "gray",
                  marginTop: "-5px",
                  marginBottom: "10px",
                }}
              >
                {userData?.emailAddress || "Email not available"}
              </p>
            </div>
            <div className="info-item">
              <FaPhone className="icon" />
              <p>{candidateData?.contactNumber || "Phone not available"}</p>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <p>{candidateData?.location || "Location not available"}</p>
            </div>
            <div className="social-links">
              <ul>
                {candidateData?.socialLinks?.map((link, index) => (
                  <li key={index} className="social-chip">
                    <a
                      className="chip-link"
                      href={
                        link.link.startsWith("https://")
                          ? link.link
                          : `https://${link.link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="main-profile">
          <p
            style={{
              color: "white",
              backgroundColor: "#fe5753",
              width: "100%",
              padding: "5px",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              opacity: ".5",
            }}
          >
            <FaStar></FaStar>&nbsp; Double-check your resume - it&apos;s what
            employers will see when you apply.&nbsp;<FaStar></FaStar>
          </p>
          <div className="resume">
            <DragnDrop
              isauth={isauth}
              onFilesSelected={handleFilesSelected}
              resumePath={resumePath}
              setResumePath={setResumePath}
              updateCandidateData={updateCandidateData}
            />
          </div>

          <div className="skills">
            {/* <label   className="labels">Skills</label> */}
            <Divider
              style={{
                fontSize: "larger",
                padding: "20px",
                fontWeight: "500",
              }}
              textAlign="left"
            >
              Skills
            </Divider>
            {isauth ? (
              <SkillSet
                candidateSkills={candidateSkills}
                setCandidateSkills={setCandidateSkills}
                updateCandidateData={updateCandidateData}
              ></SkillSet>
            ) : (
              <></>
            )}
            <div className="skills-container">
              <div className="skills-list">
                {candidateSkills && candidateSkills.length > 0 ? (
                  candidateSkills.map((skill, index) => (
                    <div key={index} className="skill-chip">
                      <p>{skill}</p>
                      {isauth ? (
                        <button
                          onClick={() => removeSkill(skill)} // Trigger the remove function
                          className="remove-skill-btn"
                        >
                          <FaTimes /> {/* Dustbin icon from react-icons */}
                        </button>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p className="err">No skills available</p>
                )}
              </div>
            </div>
          </div>
          <div className="education">
            <Divider
              style={{
                fontSize: "larger",
                padding: "20px",
                fontWeight: "500",
              }}
              textAlign="left"
            >
              Education Details
            </Divider>
            {educationData?.length > 0 ? (
              <div>
                {/* <label>Education Details</label> */}

                <EducationWrapper
                  isauth={isauth}
                  educationData={educationData}
                  setEducationData={setEducationData}
                  updateEducationData={updateEducationData}
                  deleteEducationData={deleteEducationData}
                />
              </div>
            ) : (
              <p className="err">No education data available.</p>
            )}
            {isauth ? (
              <button
                onClick={toggleEducationModel}
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  gap: "5px",
                  color: "#fe4949",
                  fontWeight: "500",
                  padding: "20px 10px",
                  // borderRadius: "25px",
                  // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <FaPlus style={{ marginTop: "5px" }}></FaPlus> Add Education
                Details...
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="experience">
            <Divider
              style={{
                fontSize: "larger",
                padding: "20px",
                fontWeight: "500",
              }}
              textAlign="left"
            >
              Experience Details
            </Divider>
            {experienceData?.length > 0 ? (
              <div>
                {/* <label>Experience Details</label> */}

                <ExperienceWrapper
                  isauth={isauth}
                  experienceData={experienceData}
                  setExperienceData={setExperienceData}
                  deleteExperienceData={deleteExperienceData}
                  updateExperienceData={updateExperienceData}
                />
              </div>
            ) : (
              <p className="err">No experience data available.</p>
            )}

            {isauth ? (
              <button
                onClick={toggleExperienceModel}
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  gap: "5px",
                  color: "#fe4949",
                  fontWeight: "500",
                  padding: "20px 10px",
                  // borderRadius: "25px",
                  // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <FaPlus style={{ marginTop: "5px" }}></FaPlus> Add Experience
                Details...
              </button>
            ) : (
              <></>
            )}
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
                updateCandidateData={updateCandidateData}
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
                addExperienceData={addExperienceData}
                toggleExperienceModel={toggleExperienceModel}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
