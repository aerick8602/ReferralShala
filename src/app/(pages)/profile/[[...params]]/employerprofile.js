"use client";

import Navbar from "../../../components/Navbar";
import { FaPlus } from "react-icons/fa";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";
import PersonalCard from "../../../components/models/PersonalModel";
import ExperienceModel from "../../../components/models/ExperienceModel";
import EducationModel from "../../../components/models/EducationModel";
import Footer from "../../../components/Footer";

import "../../../styles/Profile.css";

export default function EmployerProfile({
  userId,
  userType,
  isauth,
  userData,
  setUserData,
  employerData,
  setEmployerData,
  educationData,
  setEducationData,
  experienceData,
  setExperienceData,
  isPersonalModalOpen,
  isEducationModalOpen,
  isExperienceModalOpen,
  addEducationData,
  updateEducationData,
  deleteEducationData,
  addExperienceData,
  updateExperienceData,
  deleteExperienceData,
  updateUserData,
  updateEmployerData,
  togglePersonalModel,
  toggleEducationModel,
  toggleExperienceModel,
}) {
  return (
    <>
      <Navbar userId={userId} userType={userType} />
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
              </div>
            </div>
          </div>

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
      <Footer userId={userId} userType={userType} />
    </>
  );
}
