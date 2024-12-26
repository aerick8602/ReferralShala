import React, { useState } from "react";
import "../../styles/ReferralCard.css";
import { IoClose } from "react-icons/io5";

const ReferralCard = () => {
  const [referral, setReferral] = useState({
    jobTitle: "",
    jobDescription: "",
    jobLink: "",
    location: "",
    companyName: "",
  });

  const [errors, setErrors] = useState({});
  const [showReferralCard, setShowReferralCard] = useState(true); // State to toggle the card visibility

  // Validate individual fields in real-time
  const validateField = (name, value) => {
    const fieldErrors = {};
    if (name === "jobTitle" && !value.trim()) {
      fieldErrors.jobTitle = "* Job title is required.";
    }
    if (name === "jobLink" && !value.trim()) {
      fieldErrors.jobLink = "* Job link is required.";
    } else if (name === "jobLink" && !/^(https?:\/\/)/.test(value.trim())) {
      fieldErrors.jobLink = "* Enter a valid URL starting with http:// or https://.";
    }
    if (name === "companyName" && !value.trim()) {
      fieldErrors.companyName = "* Company name is required.";
    }
    return fieldErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the field value
    setReferral((prev) => ({ ...prev, [name]: value }));

    // Validate the field in real-time
    const fieldErrors = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name] || "",
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const allErrors = {
      ...validateField("jobTitle", referral.jobTitle),
      ...validateField("jobLink", referral.jobLink),
      ...validateField("companyName", referral.companyName),
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
    } else {
      console.log("Referral Submitted:", referral);
      // Reset form after submission
      setReferral({
        jobTitle: "",
        jobDescription: "",
        jobLink: "",
        location: "",
        companyName: "",
      });
      setErrors({});
    }
  };

  // Handle close button click
  const handleClose = () => {
    setShowReferralCard(false); // Hide the card
  };

  return (
    showReferralCard && (
      <div className="referral-model">
        <div className="referral-card">
        <button
              className="close-button"
              onClick={handleClose}
              aria-label="Close"
            >
              <IoClose size={24}></IoClose>
            </button>
          <div className="referral-card-container">
            <h2 className="referral-title">Referral Details</h2>

            <form className="referral-form" onSubmit={handleSubmit}>
              {/* Company Name */}
              <div className="referral-form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={referral.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className={errors.companyName ? "error-input" : ""}
                />
                {errors.companyName && (
                  <span className="personal-error-text">{errors.companyName}</span>
                )}
              </div>

              {/* Job Title */}
              <div className="referral-form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={referral.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  className={errors.jobTitle ? "error-input" : ""}
                />
                {errors.jobTitle && (
                  <span className="personal-error-text">{errors.jobTitle}</span>
                )}
              </div>

              {/* Job Description */}
              <div className="referral-form-group">
                <label>Job Description</label>
                <textarea
                  name="jobDescription"
                  value={referral.jobDescription}
                  onChange={handleChange}
                  placeholder="Enter job description"
                />
              </div>
              <p className="exp-help-text">
                Example: Describe key responsibilities, technologies used, and achievements during your role.
              </p>

              {/* Job Link */}
              <div className="referral-form-group">
                <label>Job Link</label>
                <input
                  type="url"
                  name="jobLink"
                  value={referral.jobLink}
                  onChange={handleChange}
                  placeholder="Enter job link"
                  className={errors.jobLink ? "error-input" : ""}
                />
                {errors.jobLink && (
                  <span className="personal-error-text">{errors.jobLink}</span>
                )}
              </div>

              {/* Location */}
              <div className="referral-form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={referral.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="referral-submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ReferralCard;
