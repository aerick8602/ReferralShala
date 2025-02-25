import React from "react";
import "../../styles/ReferralCard.css";

const ReferralWrapper = ({ dummyReferrals }) => {
  // Function to calculate days ago
  const getDaysAgo = (postedDate) => {
    const posted = new Date(postedDate);
    const today = new Date();
    const timeDiff = today - posted;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
  };

  const handleApply = async (referral) => {
    try {
      const emailData = {
        candidateEmail: "katiyarayush02@gmail.com", // Replace with actual candidate's email
        employerEmail: "katiyarayush08@gmail.com", // Fetch employer's email from referral object
        candidateName: "John Doe", // Replace with actual candidate's name
        employerName: referral.employerName, // Fetch employer's name from referral object
        jobTitle: referral.jobTitle,
        companyName: referral.companyName,
        profileLink: `http://localhost:3000/profile/1`, // Replace with dynamic candidate profile link
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
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
              onClick={() => handleApply(referral)} // ✅ Fixed: Now passing referral data
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
