"use client";
import React, { useState, useEffect } from "react";
import "../../styles/ReferralCard.css";

const ReferralWrapper = ({ dummyReferrals, candidateUserId }) => {
  const [candidateUserData, setCandidateUserData] = useState({});
  const [selectedReferral, setSelectedReferral] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log(`User Data (${userId}):`, data.data);
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

  const handleApply = async (referral) => {
    setSelectedReferral(referral);

    try {
      const employerData = await fetchUserData(referral.userId);

      // Wait for state update before using employer data
      setTimeout(async () => {
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

        console.log("Emails sent successfully!");
      }, 500);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Function to calculate days ago
  const getDaysAgo = (postedDate) => {
    const posted = new Date(postedDate);
    const today = new Date();
    const timeDiff = today - posted;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
  };

  return (
    <div className="referral-container-card">
      {dummyReferrals.map((referral) => (
        <div key={referral.referralId} className="referral-card">
          <div className="referral-cp">
            <h2 className="company-name">{referral.companyName}</h2>
            <div className="posted-date">
              <i className="pi pi-clock"></i>
              {getDaysAgo(referral.postedAt)}
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
              onClick={() => handleApply(referral)}
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
