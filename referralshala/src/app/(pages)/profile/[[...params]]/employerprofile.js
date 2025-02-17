"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import { FaCamera, FaPlus } from "react-icons/fa";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";
import PersonalCard from "../../../components/models/PersonalModel";
import ExperienceModel from "../../../components/models/ExperienceModel";
import EducationModel from "../../../components/models/EducationModel";
import Footer from "../../../components/Footer";
import { Toast } from "primereact/toast";
import { HashLoader } from "react-spinners";
import "../../../styles/Profile.css";

export default function EmployerProfile({ userId, clerkID }) {
  const [isauth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [employerData, setEmployerData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useRef(null);
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
  const fetchEmployerData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/employer`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("Employer Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching employer data:", error);
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
  const fetchData = async () => {
    console.log("UserId :", userId);
    setIsLoading(true);
    try {
      const [userData, employerData, educationData, experienceData] =
        await Promise.all([
          fetchUserData(userId),
          fetchEmployerData(userId),
          fetchEducationData(userId),
          fetchExperienceData(userId),
        ]);

      setUserData(userData);
      setEmployerData(employerData);
      setEducationData(educationData || []);
      setExperienceData(experienceData || []);
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
      showToast("secondary", "Added", "Education data added successfully!");
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
      showToast("secondary", "Updated", "Education data updated successfully!");
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
      showToast("secondary", "Deleted", "Education data deleted successfully!");
    } catch (error) {
      console.error("Error deleting education data:", error);
    }
  };
  const addExperienceData = async (experienceData) => {
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
      showToast("secondary", "Added", "Experience added successfully!");
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
      console.log("Update EXP successful:", data);
      showToast("secondary", "Updated", "Experience updated successfully!");
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
      console.log("delete successful:", data);
      showToast("secondary", "Deleted", "Experience deleted successfully!");
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

  const updateEmployerData = async (EmployerData) => {
    try {
      if (typeof EmployerData !== "object" || EmployerData === null) {
        throw new Error("Data must be a non-null object.");
      }
      const requestBody = {
        ...(EmployerData.location !== undefined && {
          location: EmployerData.location,
        }),
        ...(EmployerData.contactNumber !== undefined && {
          contactNumber: EmployerData.contactNumber,
        }),
        ...(EmployerData.socialLinks !== undefined && {
          socialLinks: EmployerData.socialLinks,
        }),
        ...(EmployerData.jobRole !== undefined && {
          jobRole: EmployerData.jobRole,
        }),
        ...(EmployerData.companyName !== undefined && {
          companyName: EmployerData.companyName,
        }),
      };

      console.log("RequestBody:", requestBody);

      const response = await fetch(`/api/user/profile/${userId}/employer`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      showToast("secondary", "Updated", "Data updated successfully!");
      const data = await response.json();

      console.log("Update successful:", data);

      return data;
    } catch (error) {
      console.log("Error updating employer:", error);
      return null;
    }
  };
  /*####################  apis  #####################*/

  const togglePersonalModel = () =>
    setIsPersonalModalOpen(!isPersonalModalOpen);
  const toggleEducationModel = () =>
    setIsEducationModalOpen(!isEducationModalOpen);
  const toggleExperienceModel = () =>
    setIsExperienceModalOpen(!isExperienceModalOpen);

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    setIsAuth(userData.id == "user_" + clerkID);
  }, [isLoading]);

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
      <Navbar userId={userId} clerkID={clerkID} userType={userData.userType} />
      <h1 className="profile-header">Profile</h1>
      <div className="employer-profile">
        <div className="employer-main-profile">
          <div className="profile-container">
            {/* Banner */}
            <div className="profile-banner">
              {/* <button className="banner-camera-btn">
                <FaCamera className="camera-icon" />
              </button> */}
            </div>

            {/* Profile Section */}
            <div className="profile-details">
              {/* Profile Picture */}
              <div className="profile-picture-container">
                <img
                  src={userData?.profileImage || "/user.png"}
                  alt="Profile"
                  className="avatar-img profile-picture"
                />
              </div>

              {/* User Details */}
              <div className="profile-info">
                <div className="for-btn">
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
                    {`${userData?.firstName
                      ?.charAt(0)
                      .toUpperCase()}${userData?.firstName
                      ?.slice(1)
                      .toLowerCase()} 
    ${userData?.lastName?.charAt(0).toUpperCase()}${userData?.lastName
                      ?.slice(1)
                      .toLowerCase()}`}
                  </div>

                  {isauth ? (
                    <button
                      onClick={togglePersonalModel}
                      className="edit-btn edit-button"
                      title="Edit Profile"
                      style={{
                        width: "35px",
                        height: "35px",
                        marginTop: "-65px",
                      }}
                    >
                      <i className="pi pi-pencil"></i>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    {employerData?.jobRole && employerData?.companyName && (
                      <p className="profile-title">
                        {employerData.jobRole} at {employerData.companyName}
                      </p>
                    )}

                    {employerData?.contactNumber && (
                      <div
                        className="info-item"
                        style={{
                          fontSize: "small",
                          marginLeft: "0px",
                          padding: "2px",
                          marginTop: "10px",
                        }}
                      >
                        <i className="pi pi-phone"></i>
                        <div>{employerData.contactNumber}</div>
                      </div>
                    )}

                    {employerData?.location && (
                      <div
                        className="info-item"
                        style={{
                          fontSize: "small",
                          marginLeft: "0px",
                          padding: "2px",
                        }}
                      >
                        <i className="pi pi-map-marker"></i>
                        <div>{employerData.location}</div>
                      </div>
                    )}
                  </div>
                  <div className="social-links">
                    <ul>
                      {employerData?.socialLinks?.map((link, index) => (
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
                {/* <a href="#" className="profile-contact">
                  Contact info
                </a> */}
                {/* <p className="profile-connections">372 connections</p> */}
              </div>
            </div>
          </div>
          {/* <div className="profile-note">
            <i className="pi pi-star"></i>
            &nbsp; Double-check your profile - it&apos;s what employers will see
            when you apply.&nbsp;
            <i className="pi pi-star"></i>
          </div> */}
          {/* <br />
          <div className="resume">
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
                <div style={{ marginTop: "12px", marginBottom: "-15px" }}>
                  <ul style={{ listStyle: "none", padding: "20px" }}>
                    {resume.map((file, index) => (
                      <li
                        className="profile-resume"
                        key={index}
                        style={{ height: "18px" }}
                      >
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
                        </a>

                        {isauth && (
                          <button
                            onClick={() => confirmDelete(index)}
                            className="delete-btn"
                            title="Remove Resume"
                          >
                            <i className="pi pi-trash"></i>
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <br />
                  <p className="err">No resume found. Please upload a file.</p>
                  <br />
                </div>
              )}
            </div>
          </div>

          <div className="skills">
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

            <div className="skills-container">
              <br />
              <div className="skills-list">
                {candidateSkills && candidateSkills.length > 0 ? (
                  candidateSkills.map((skill, index) => (
                    <div key={index} className="skill-chip">
                      <div>{skill}</div>
                      {isauth ? (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="remove-skill-btn"
                        >
                          <FaTimes />
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
          </div> */}

          {/* <label>Experience Details</label> */}
          <div
            className="candidate-experience"
            style={{ marginBottom: "-10px" }}
          >
            {/* <Divider className="profile-divider" textAlign="left">
              <i className="pi pi-briefcase mr-2"></i>
              &nbsp;Experience Details
            </Divider> */}
            {experienceData?.length > 0 ? (
              <div>
                <ExperienceWrapper
                  isauth={isauth}
                  experienceData={experienceData}
                  setExperienceData={setExperienceData}
                  deleteExperienceData={deleteExperienceData}
                  updateExperienceData={updateExperienceData}
                />
              </div>
            ) : (
              <div>
                <br />
                <p className="err">No experience data available.</p>
                <br />
              </div>
            )}

            {isauth ? (
              <button className="add-details" onClick={toggleExperienceModel}>
                <FaPlus className="icon" /> Add Experience Details...
              </button>
            ) : (
              <></>
            )}
          </div>

          {/* <label>Education Details</label> */}
          <div className="education employer-education">
            {/* <Divider className="profile-divider" textAlign="left">
              <i className="pi pi-book mr-2"></i>
              &nbsp;Education Details
            </Divider> */}
            {educationData?.length > 0 ? (
              <div>
                <EducationWrapper
                  isauth={isauth}
                  educationData={educationData}
                  setEducationData={setEducationData}
                  updateEducationData={updateEducationData}
                  deleteEducationData={deleteEducationData}
                />
              </div>
            ) : (
              <div>
                <br />
                <p className="err">No education data available.</p>
                <br />
              </div>
            )}
            {isauth ? (
              <button className="add-details" onClick={toggleEducationModel}>
                <FaPlus className="icon" /> Add Education Details...
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
                userType={userData.userType}
                userData={userData}
                data={employerData}
                setUserData={setUserData}
                setData={setEmployerData}
                togglePersonalModel={togglePersonalModel}
                updateUserData={updateUserData}
                updateData={updateEmployerData}
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
