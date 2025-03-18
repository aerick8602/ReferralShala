"use client";
import Navbar from "../../../components/Navbar";
import { confirmDialog } from "primereact/confirmdialog";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";
import PersonalCard from "../../../components/models/PersonalModel";
import ExperienceModel from "../../../components/models/ExperienceModel";
import EducationModel from "../../../components/models/EducationModel";
import Footer from "../../../components/Footer";
import TemplateDemo from "../../../components/TemplateDemo";
import { FaTimes, FaPlus } from "react-icons/fa";
import SkillSet from "../../../components/MultiSelect";
import Divider from "@mui/material/Divider";
import "../../../styles/Profile.css";

export default function CandidateProfile({
  userId,
  userType,
  isauth,
  userData,
  setUserData,
  candidateData,
  setCandidateData,
  educationData,
  setEducationData,
  experienceData,
  setExperienceData,
  isPersonalModalOpen,
  isEducationModalOpen,
  isExperienceModalOpen,
  candidateSkills,
  setCandidateSkills,
  resume,
  setResume,
  addEducationData,
  updateEducationData,
  deleteEducationData,
  addExperienceData,
  updateExperienceData,
  deleteExperienceData,
  updateUserData,
  updateCandidateData,
  togglePersonalModel,
  toggleEducationModel,
  toggleExperienceModel,
}) {
  const removeSkill = async (skillToRemove) => {
    const updatedSkills = candidateSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setCandidateSkills(updatedSkills);
    updateCandidateData({ skills: updatedSkills });
  };

  const handleDeleteResume = (index) => {
    setResume((prev) => {
      const updatedResume = prev.filter((_, i) => i !== index);
      updateCandidateData({ resume: updatedResume });
      return updatedResume;
    });
  };

  const confirmDelete = (index) => {
    confirmDialog({
      message: "Are you sure you want to delete this resume ?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => handleDeleteResume(index),
    });
  };

  return (
    <>
      <Navbar userId={userId} userType={userType} />
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
            <button
              onClick={togglePersonalModel}
              className="edit-btn edit-button"
              title="Edit Profile"
              style={{ width: "35px", height: "35px" }}
            >
              <i className="pi pi-pencil"></i>
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
                {`${userData?.firstName
                  ?.charAt(0)
                  .toUpperCase()}${userData?.firstName?.slice(1).toLowerCase()} 
    ${userData?.lastName?.charAt(0).toUpperCase()}${userData?.lastName
                  ?.slice(1)
                  .toLowerCase()}`}
              </div>
            </div>
            <div className="info-item">
              <div className="profile-email">
                {userData?.emailAddress || "Email not available"}
              </div>
            </div>
            {candidateData?.contactNumber && (
              <div className="info-item" style={{ fontSize: "small" }}>
                <i className="pi pi-phone"></i>
                <div>{candidateData.contactNumber}</div>
              </div>
            )}

            {candidateData?.location && (
              <div className="info-item" style={{ fontSize: "small" }}>
                <i className="pi pi-map-marker"></i>
                <div>{candidateData.location}</div>
              </div>
            )}

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
            <i className="pi pi-star"></i>
            &nbsp; Double-check your profile - it&apos;s what employers will see
            when you apply.&nbsp;
            <i className="pi pi-star"></i>
          </div>
          <br />
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
          </div>

          {/* <label>Education Details</label> */}
          <div className="education">
            <Divider className="profile-divider" textAlign="left">
              <i className="pi pi-book mr-2"></i>
              &nbsp;Education Details
            </Divider>
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

          {/* <label>Experience Details</label> */}
          <div className="candidate-experience">
            <Divider className="profile-divider" textAlign="left">
              <i className="pi pi-briefcase mr-2"></i>
              &nbsp;Experience Details
            </Divider>
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
                data={candidateData}
                setUserData={setUserData}
                setData={setCandidateData}
                togglePersonalModel={togglePersonalModel}
                updateUserData={updateUserData}
                updateData={updateCandidateData}
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
      <Footer userId={userId} userType={userType} />
    </>
  );
}
