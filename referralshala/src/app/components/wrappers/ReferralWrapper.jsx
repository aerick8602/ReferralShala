"use client";
import React, { useState, useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "../../styles/ReferralCard.css";

const ReferralWrapper = ({ dummyReferrals, candidateUserId }) => {
  const [candidateUserData, setCandidateUserData] = useState({});
  const [selectedReferral, setSelectedReferral] = useState(null);
  const toast = useRef(null);

  const fetchUserData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching user data for ${userId}:`, error);
      return null;
    }
  };

  const fetchCandidateData = async () => {
    if (candidateUserId) {
      const candidateData = await fetchUserData(candidateUserId);
      setCandidateUserData(candidateData || {});
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, [candidateUserId]);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  const handleApply = async (referral) => {
    setSelectedReferral(referral);

    try {
      const employerData = await fetchUserData(referral.userId);
      const emailData = {
        candidateUserId: candidateUserId,
        candidateEmail: candidateUserData.emailAddress || "N/A",
        employerEmail: employerData?.emailAddress || "N/A",
        candidateName: candidateUserData.firstName,
        employerName: employerData?.firstName || "Employer",
        jobTitle: referral.jobTitle,
        companyName: referral.companyName,
      };

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      console.log("okkkk");
      showToast(
        "secondary",
        "Application Sent",
        "Your application email has been sent successfully!"
      );
    } catch (error) {
      console.error("Error sending email:", error);
      showToast("secondary", "Error", "Failed to send application email.");
    }
  };

  const confirmApply = (referral) => {
    confirmDialog({
      message: `Apply for ${referral.jobTitle} at ${referral.companyName}?`,
      header: "Confirm Application",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleApply(referral),
      reject: () =>
        showToast("warn", "Cancelled", "Application was cancelled."),
    });
  };

  const getDaysAgo = (postedDate) => {
    const posted = new Date(postedDate);
    const today = new Date();
    const timeDiff = today - posted;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
  };

  return (
    <div className="referral-container-card">
      <Toast ref={toast} />
      <ConfirmDialog />
      {dummyReferrals.map((referral) => (
        <div key={referral.referralId} className="referral-card">
          <div className="referral-cp">
            <h2 className="company-name">{referral.companyName}</h2>
            <div className="posted-date">
              <i className="pi pi-clock"></i> {getDaysAgo(referral.postedAt)}
            </div>
          </div>

          <p className="job-category">{referral.jobCategory}</p>
          <h3 className="job-title">{referral.jobTitle}</h3>
          <p className="job-description">{referral.jobDescription}</p>
          <p className="job-location">
            <strong>Location:</strong> {referral.location}
          </p>
          <p className="experience">
            <strong>Experience Required:</strong> {referral.experienceRequired}{" "}
            years
          </p>

          <div className="button-container">
            <a
              href={referral.jobLink}
              className="know-more-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Know More
            </a>
            <button
              className="apply-button"
              onClick={() => confirmApply(referral)}
            >
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReferralWrapper;
