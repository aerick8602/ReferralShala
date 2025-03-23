"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { HashLoader } from "react-spinners";
import { Toast } from "primereact/toast";

export default function MyReferrals() {
  const params = useParams();
  const userId = params.userId;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentReferral, setCurrentReferral] = useState({});
  const [referralData, setReferralData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const toggleReferralModel = () =>
    setIsReferralModalOpen(!isReferralModalOpen);

  const toast = useRef(null);
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  const fetchUserId = async () => {
    if (!user?.id) return;

    try {
      const response = await axios.get(`/api/user/${user.id}`);
      setUserData(response.data.data);
      console.log("Fetched user data:", response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  const getReferrals = async () => {
    // setLoading(true);
    try {
      const res = await axios.get(`/api/referral/get/${userId}`);

      console.log("My referral Data", res.data.data);
      setReferralData(res.data.data);

      return res.data.data;
    } catch {
      console.log("Error fetching referrals data");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteReferral = async (referralId) => {
    if (!referralId) {
      console.error("Error: referralId is required.");
      return null;
    }

    try {
      const res = await axios.delete(`/api/referral/delete/${referralId}`);
      console.log("Referral deleted successfully:", res.data);
      showToast(
        "secondary",
        "Referral Deleted",
        "The referral has been deleted successfully."
      );
      return res.data;
    } catch (error) {
      console.log("Error deleting referral:", error.message);
      showToast(
        "danger",
        "Deletion Failed",
        "An error occurred while deleting the referral."
      );
      return null;
    }
  };

  const addReferral = async (referralData) => {
    try {
      const res = await axios.post(
        `/api/referral/post/${userId}`,
        referralData
      );
      console.log("Referral created:", res.data);
      showToast(
        "secondary",
        "Referral Added",
        "New Referral  has been added successfully!"
      );
      return res.data;
    } catch {
      console.log("Error creating referral");
      return null;
    }
  };

  const updateReferral = async (referralId, referralData) => {
    try {
      const res = await axios.patch(
        `/api/referral/patch/${referralId}`,
        referralData
      );
      showToast(
        "secondary",
        "Referral Updated",
        "The referral has been updated successfully."
      );
      console.log("Referral updated:", res.data);
      return res.data;
    } catch (error) {
      console.log("Error updating referral:", error.message);
      showToast(
        "danger",
        "Update Failed",
        "An error occurred while updating the referral."
      );
      return null;
    }
  };

  useEffect(() => {
    fetchUserId();
    getReferrals();
  }, [user]);

  const handleAdd = () => {
    setCurrentReferral({}); // Empty object for new referral
    setIsEditing(false); // Set mode to add
    setIsReferralModalOpen(true);
  };

  const handleEdit = (referralId) => {
    const selectedReferral = referralData.find(
      (ref) => ref.referralId === referralId
    );
    setCurrentReferral(selectedReferral);
    setIsEditing(true); // Set mode to edit
    setIsReferralModalOpen(true);
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
    deleteReferral(referralId);
    console.log("Deleting:", referralId);
  };

  if (!isLoaded || !isSignedIn || loading) {
    return (
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Toast ref={toast} />
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
                        label={
                          referral.companyName
                            ? referral.companyName.charAt(0).toUpperCase()
                            : "?"
                        }
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
              isEditing={isEditing}
              referralData={currentReferral}
              setReferralData={setReferralData}
              toggleReferralModel={toggleReferralModel}
              addReferral={addReferral}
              updateReferral={updateReferral}
              getReferrals={getReferrals}
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
