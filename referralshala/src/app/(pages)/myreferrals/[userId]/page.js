"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { FaPlus } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "../../../styles/Referrals.css";
import ReferralCard from "../../../components/models/ReferralModel";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Divider } from "primereact/divider";

export default function MyReferrals() {
  const params = useParams();
  const userId = params.params;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentReferral, setCurrentReferral] = useState({});
  const [referralData, setReferralData] = useState([
    {
      referralId: 1,
      userId: 101,
      companyName: "Google",
      jobCategory: "Software Engineering",
      jobTitle: "Frontend Developer",
      jobDescription:
        "Develop and maintain UI components using React.js and Next.js.",
      jobLink: "https://careers.google.com/jobs/",
      location: "San Francisco, CA",
      experienceRequired: 2,
      applicationCount: 5,
      postedAt: "2024-02-10T08:30:00Z",
      updatedAt: "2024-02-12T10:00:00Z",
    },
    {
      referralId: 2,
      userId: 102,
      companyName: "Microsoft",
      jobCategory: "Backend Engineering",
      jobTitle: "Node.js Developer",
      jobDescription: "Design scalable APIs using Express.js and MongoDB.",
      jobLink: "https://careers.microsoft.com/",
      location: "Seattle, WA",
      experienceRequired: 3,
      applicationCount: 8,
      postedAt: "2024-01-15T09:45:00Z",
      updatedAt: "2024-01-18T14:30:00Z",
    },
    {
      referralId: 3,
      userId: 103,
      companyName: "Amazon",
      jobCategory: "Cloud Computing",
      jobTitle: "AWS DevOps Engineer",
      jobDescription:
        "Manage cloud infrastructure using AWS services and Terraform.",
      jobLink: "https://www.amazon.jobs/",
      location: "New York, NY",
      experienceRequired: 4,
      applicationCount: 12,
      postedAt: "2024-03-01T11:00:00Z",
      updatedAt: "2024-03-03T16:20:00Z",
    },
    {
      referralId: 4,
      userId: 104,
      companyName: "Meta",
      jobCategory: "Data Science",
      jobTitle: "Data Analyst",
      jobDescription: "Analyze user behavior using SQL, Python, and Power BI.",
      jobLink: "https://www.metacareers.com/",
      location: "Menlo Park, CA",
      experienceRequired: 2,
      applicationCount: 6,
      postedAt: "2024-02-20T07:30:00Z",
      updatedAt: "2024-02-22T12:15:00Z",
    },
    {
      referralId: 5,
      userId: 105,
      companyName: "Tesla",
      jobCategory: "Embedded Systems",
      jobTitle: "Firmware Engineer",
      jobDescription: "Develop embedded software for automotive applications.",
      jobLink: "https://www.tesla.com/careers",
      location: "Palo Alto, CA",
      experienceRequired: 5,
      applicationCount: 3,
      postedAt: "2024-01-30T14:00:00Z",
      updatedAt: "2024-02-02T09:50:00Z",
    },
  ]);

  const toggleReferralModel = () =>
    setIsReferralModalOpen(!isReferralModalOpen);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`/api/user/${user.id}`);
        setUserData(response.data.data);
        console.log("Fetched user data:", response.data.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [user]);

  const handleAdd = () => {
    toggleReferralModel();
  };

  const handleEdit = (referralId) => {
    const selectedReferral = referralData.find(
      (ref) => ref.referralId === referralId
    );
    setCurrentReferral(selectedReferral);
    toggleReferralModel();
    console.log("Editing:", referralId);
  };

  const confirmDelete = (referralId) => {
    confirmDialog({
      message: "Are you sure you want to delete this referral?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => handleDelete(referralId),
    });
  };

  const handleDelete = (referralId) => {
    const updatedReferralData = referralData.filter(
      (ref) => ref.referralId !== referralId
    );
    setReferralData(updatedReferralData);
    console.log("Deleting:", referralId);
  };

  return (
    <>
      <ConfirmDialog />
      <Navbar
        userId={userData.userId}
        userType={userData.userType}
        clerkID={user?.id.replace("user_", "")}
      />

      <h1 className="referrals-header">My Referrals</h1>
      <div className="referrals-container">
        <p className="referrals-description">
          #View and manage your referrals. Keep track of job applications and
          help others find opportunities!
        </p>
        <button className="add-details" onClick={handleAdd}>
          <FaPlus className="icon" /> Post Referral
        </button>

        <Divider />
        {referralData.length > 0 ? (
          <Accordion>
            {referralData.map((referral) => (
              <AccordionTab
                key={referral.referralId}
                header={
                  <div className="referral-header">
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "10px",
                      }}
                    >
                      <Avatar
                        label={referral.companyName.charAt(0)}
                        shape="circle"
                      />
                      {referral.companyName}
                    </div>

                    <Badge
                      value={referral.applicationCount || 0}
                      className="custom-badge"
                    />
                  </div>
                }
              >
                <div className="referral-item">
                  <div
                    className="referral-actions"
                    style={{ marginBottom: "-30px", marginTop: "-10px" }}
                  >
                    <i
                      className="pi pi-pencil edit edit-btn"
                      onClick={() => handleEdit(referral.referralId)}
                    ></i>
                    <i
                      className="pi pi-trash delete delete-btn"
                      onClick={() => confirmDelete(referral.referralId)}
                    ></i>
                  </div>
                  <p className="job-category">{referral.jobCategory}</p>
                  <h3 className="job-title">{referral.jobTitle}</h3>
                  <p className="job-description">{referral.jobDescription}</p>
                  <p className="job-location">
                    <strong>Location:</strong> {referral.location}
                  </p>
                  <p className="experience">
                    <strong>Experience Required:</strong>{" "}
                    {referral.experienceRequired} years
                  </p>
                  <a
                    href={referral.jobLink}
                    className="apply-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Job Link
                  </a>
                </div>
              </AccordionTab>
            ))}
          </Accordion>
        ) : (
          <p
            className="no-referrals-message"
            style={{ textAlign: "center", padding: "20px", color: "#888" }}
          >
            No referrals available at the moment.
          </p>
        )}
      </div>
      {isReferralModalOpen && (
        <div className="modal-backdrop" onClick={toggleReferralModel}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <ReferralCard
              toggleReferralModel={toggleReferralModel}
              userType={userData.userType}
              userData={userData}
              referralData={currentReferral}
              setReferralData={setReferralData}
            />
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <Footer userId={userData.userId} userType={userData.userType} />
    </>
  );
}
