import React from "react";
import "../../styles/ReferralCard.css";

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

const ReferralWrapper = () => {
  return (
    <div className="referral-container">
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
          <a
            href={referral.jobLink}
            className="apply-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default ReferralWrapper;
