import React from "react";
import "../../styles/ReferralCard.css";

const ReferralWrapper = ({ dummyReferrals }) => {
  return (
    <div className="referral-container-card">
      {dummyReferrals.map((referral) => (
        <div key={referral.referralId} className="referral-card">
          <h2 className="company-name">{referral.companyName}</h2>
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
            <a
              className="apply-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReferralWrapper;
