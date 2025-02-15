"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";
import PersonalCard from "../../../components/models/PersonalModel";
import ExperienceModel from "../../../components/models/ExperienceModel";
import EducationModel from "../../../components/models/EducationModel";
import DragnDrop from "../../../components/DragnDrop";
import Footer from "../../../components/Footer";
import TemplateDemo from "../../../components/TemplateDemo";
import { Toast } from "primereact/toast";

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
import { Button } from "primereact/button";

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
  const [resume, setResume] = useState([]);
  // const [resumePath, setResumePath] = useState(null);
  const toast = useRef(null); // Toast reference

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

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
      setResume(candidateData.resume);
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
      showToast("success", "Added", "Education data added successfully!");
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
      showToast("info", "Updated", "Education data updated successfully!");
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
      showToast("error", "Deleted", "Education data deleted successfully!");
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
      showToast("success", "Added", "Experience added successfully!");
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
      showToast("info", "Updated", "Experience updated successfully!");
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
      showToast("error", "Deleted", "Experience deleted successfully!");
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
      showToast("info", "Updated", "User data updated successfully!");
      console.log("Update successful:", data);
      return data;
    } catch (error) {
      console.log("Error updating candidate:", error);
      return null;
    }
  };
  const updateCandidateData = async (CandidateData) => {
    try {
      if (typeof CandidateData !== "object" || CandidateData === null) {
        throw new Error("experienceData must be a non-null object.");
      }
      const requestBody = {
        ...(CandidateData.skills !== undefined && {
          skills: CandidateData.skills,
        }),
        ...(CandidateData.resume !== undefined && {
          resume: CandidateData.resume,
        }),
        ...(CandidateData.location !== undefined && {
          location: CandidateData.location,
        }),
        ...(CandidateData.contactNumber !== undefined && {
          contactNumber: CandidateData.contactNumber,
        }),
        ...(CandidateData.socialLinks !== undefined && {
          socialLinks: CandidateData.socialLinks,
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
      // showToast("info", "Updated", "User data updated successfully!");
      console.log("Update successful:", data);
      // showToast("info", "Updated", "Data updated successfully!");
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

  // const handleFilesSelected = async (selectedFile) => {
  //   if (!selectedFile) return;
  //   console.log(selectedFile);
  //   setFile(selectedFile);
  //   if (file) {
  //     const formDataToUpload = new FormData();
  //     formDataToUpload.append("file", file);
  //     console.log(formDataToUpload);

  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formDataToUpload,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to upload image");
  //     }

  //     const result = await response.json();
  //     console.log(result);
  //     const filePath = result.filePath;
  //     console.log("filePath", filePath);
  //     // setResumePath(filePath);
  //     updateCandidateData({ resume: filePath });
  //   }
  // };

  const handleDeleteResume = (index) => {
    setResume((prev) => {
      const updatedResume = prev.filter((_, i) => i !== index);
      updateCandidateData({ resume: updatedResume });
      return updatedResume;
    });
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
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }
  return (
    <>
      <Toast ref={toast} />
      <Navbar userId={userId} />
      <h1 className="profile-header">Profile</h1>
      <div className="profile">
        <div className="profile-personal-data">
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
              <div className="profile-email">
                {userData?.emailAddress || "Email not available"}
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="icon" />
              <div>{candidateData?.contactNumber || "Phone not available"}</div>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <div>{candidateData?.location || "Location not available"}</div>
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
          <div className="profile-note">
            <FaStar className="star-icon" />
            &nbsp; Double-check your profile - it&apos;s what employers will see
            when you apply.&nbsp;
            <FaStar className="star-icon" />
          </div>
          <br />
          <div className="resume">
            {/* <DragnDrop
              isauth={isauth}
              onFilesSelected={handleFilesSelected}
              resumePath={resumePath}
              setResumePath={setResumePath}
              updateCandidateData={updateCandidateData}
            /> */}
            {isauth && (
              <TemplateDemo
                resume={resume}
                setResume={setResume}
                updateCandidateData={updateCandidateData}
              />
            )}

            <div>
              <br />
              <Divider className="profile-divider" textAlign="left">
                <i className="pi pi-file mr-2"></i>
                &nbsp;Resume
              </Divider>

              {Array.isArray(resume) && resume.length > 0 ? (
                <div style={{ marginTop: "12px" }}>
                  <ul style={{ listStyle: "none", padding: "0" }}>
                    {resume.map((file, index) => (
                      <li className="profile-resume" key={index}>
                        {/* File Link */}
                        <a
                          href={file.fileURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "#626161",
                            fontWeight: "500",
                            transition: "color 0.3s",
                            fontSize: "16px",
                          }}
                        >
                          {file.fileName}
                          {/* {file.fileName.split(".").slice(0, -1).join(".")} */}
                        </a>

                        {/* Delete Button */}
                        {/* <button
                          onClick={() => handleDelete(edu.educationId)}
                          className="delete-btn"
                          title="Delete Education"
                        >
                          <FaTrashAlt />
                        </button> */}
                        <Button
                          icon="pi pi-trash"
                          className="p-button-rounded p-button-text p-button-danger"
                          onClick={() => handleDeleteResume(index)}
                          tooltipOptions={{ position: "left" }}
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "red",
                            cursor: "pointer",
                            fontSize: "10px !important",
                            transition: "color 0.3s",
                            padding: "0px",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#b30000")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "red")
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="err">No resume found. Please upload a file.</p>
              )}
            </div>
          </div>

          <div className="skills">
            {/* <label   className="labels">Skills</label> */}
            <Divider className="profile-divider" textAlign="left">
              <i className="pi pi-star mr-2"></i>
              &nbsp;Skills
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
            <br />
            <div className="skills-container">
              <div className="skills-list">
                {candidateSkills && candidateSkills.length > 0 ? (
                  candidateSkills.map((skill, index) => (
                    <div key={index} className="skill-chip">
                      <div>{skill}</div>
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
            <br />
          </div>

          <div className="education">
            <Divider className="profile-divider" textAlign="left">
              <i className="pi pi-book mr-2"></i>
              &nbsp;Education Details
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
              <button className="add-details" onClick={toggleEducationModel}>
                <FaPlus className="icon" /> Add Education Details...
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="experience">
            <Divider className="profile-divider" textAlign="left">
              <i className="pi pi-briefcase mr-2"></i>
              &nbsp;Experience Details
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
              <button className="add-details" onClick={toggleExperienceModel}>
                <FaPlus className="icon" /> Add Experience Details...
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
