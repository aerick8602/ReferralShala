"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { HashLoader } from "react-spinners";
import "../../../styles/dashboard.css";
import axios from "axios";
import { useParams } from "next/navigation";
import "../../../styles/Referrals.css";

import ReferralCard from "../../../components/models/ReferralModel";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function MyReferrals() {
  const params = useParams();
  const userId = params.params;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // Dummy data for testing
  const dummyReferrals = [
    {
      referralId: 1,
      companyName: "Google",
      jobCategory: "Software Engineering",
      jobTitle: "Frontend Developer",
      jobDescription: "Develop UI components with React.js",
      jobLink: "https://careers.google.com/jobs/",
      location: "San Francisco, CA",
      experienceRequired: 2,
    },
    {
      referralId: 2,
      companyName: "Microsoft",
      jobCategory: "Backend Engineering",
      jobTitle: "Node.js Developer",
      jobDescription: "Build scalable APIs with Express.js",
      jobLink: "https://careers.microsoft.com/",
      location: "Seattle, WA",
      experienceRequired: 3,
    },
    {
      referralId: 3,
      companyName: "Amazon",
      jobCategory: "Cloud Engineering",
      jobTitle: "AWS Solutions Architect",
      jobDescription: "Design and implement AWS cloud solutions",
      jobLink: "https://www.amazon.jobs/",
      location: "New York, NY",
      experienceRequired: 5,
    },
    {
      referralId: 4,
      companyName: "Meta",
      jobCategory: "Machine Learning",
      jobTitle: "AI Research Engineer",
      jobDescription: "Develop cutting-edge ML models for social media",
      jobLink: "https://www.metacareers.com/jobs/",
      location: "Menlo Park, CA",
      experienceRequired: 4,
    },
    {
      referralId: 5,
      companyName: "Netflix",
      jobCategory: "Data Science",
      jobTitle: "Data Scientist",
      jobDescription: "Analyze user behavior and optimize recommendations",
      jobLink: "https://jobs.netflix.com/",
      location: "Los Angeles, CA",
      experienceRequired: 3,
    },
    {
      referralId: 6,
      companyName: "Tesla",
      jobCategory: "Embedded Systems",
      jobTitle: "Firmware Engineer",
      jobDescription: "Develop software for electric vehicles",
      jobLink: "https://www.tesla.com/careers",
      location: "Austin, TX",
      experienceRequired: 3,
    },
  ];

  const handleEdit = (referral) => {
    toggleReferralModel();
    console.log("Editing:", referral);
  };

  const confirmDelete = (referral) => {
    confirmDialog({
      message: "Are you sure you want to delete this referral?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => handleDelete(referral),
    });
  };

  const handleDelete = (referral) => {
    console.log("Deleting:", referral);
  };

  return (
    <>
      <ConfirmDialog />
      <Navbar
        userId={userData.userId}
        userType={userData.userType}
        clerkID={user?.id.replace("user_", "")}
      />

      <div className="referrals-container">
        {/* Add Referral Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        ></div>

        <h1 className="referrals-header">My Referrals</h1>
        <button className="add-details" onClick={toggleReferralModel}>
          <FaPlus className="icon" /> Add Referral
        </button>
        <br />
        <div className="referrals-table">
          <DataTable
            value={dummyReferrals}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            tableStyle={{ minWidth: "60rem" }}
            emptyMessage="No referrals found"
          >
            <Column
              field="companyName"
              header="Company Name"
              style={{ width: "15%" }}
            />
            <Column
              field="jobCategory"
              header="Job Category"
              style={{ width: "15%" }}
            />

            {/* Job Title & Job Link Merged */}
            <Column
              header="Job Title"
              body={(rowData) => (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>{rowData.jobTitle}</span>
                  {rowData.jobLink && (
                    <a
                      href={rowData.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#3B82F6",
                        textDecoration: "none",
                        transition: "color 0.2s ease-in-out",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#1E40AF")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "#3B82F6")
                      }
                    >
                      <i
                        className="pi pi-link"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    </a>
                  )}
                </span>
              )}
              style={{ width: "20%" }}
            />

            <Column
              field="location"
              header="Location"
              style={{ width: "20%" }}
            />
            <Column
              field="experienceRequired"
              header="Experience Required"
              style={{ width: "5%" }}
              bodyStyle={{ textAlign: "center" }}
            />
            <Column
              field="applicationCount"
              header="Number of Applicants"
              style={{ width: "8%" }}
              bodyStyle={{ textAlign: "center" }}
            />
            <Column
              field="postedAt"
              header="Posted On"
              style={{ width: "10%" }}
            />

            {/* Edit & Delete Actions */}
            <Column
              header="Actions"
              body={(rowData) => (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "25px",
                  }}
                >
                  <i
                    className="pi pi-pencil"
                    style={{
                      fontSize: "1rem",
                      color: "#3B82F6",
                      cursor: "pointer",
                      transition: "color 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#1E40AF")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#3B82F6")
                    }
                    onClick={() => handleEdit(rowData)}
                  ></i>

                  <i
                    className="pi pi-trash"
                    style={{
                      fontSize: "1rem",
                      color: "#EF4444",
                      cursor: "pointer",
                      transition: "color 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#DC2626")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#EF4444")
                    }
                    onClick={() => confirmDelete(rowData)}
                  ></i>
                </span>
              )}
              style={{ width: "10%", textAlign: "center" }}
            />
          </DataTable>
        </div>
      </div>

      <br />
      <br />
      {isReferralModalOpen && (
        <div className="modal-backdrop" onClick={toggleReferralModel}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <ReferralCard
              toggleReferralModel={toggleReferralModel}
              userType={userData.userType}
              userData={userData}
            />
          </div>
        </div>
      )}
      <Footer userId={userData.userId} userType={userData.userType} />
    </>
  );
}
