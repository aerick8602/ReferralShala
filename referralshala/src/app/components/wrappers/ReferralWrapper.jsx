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
