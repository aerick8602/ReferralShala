import React, { useState } from "react";
import "../../styles/ReferralModel.css";
import { IoClose } from "react-icons/io5";

const ReferralModel = ({ toggleReferralModel, referralData }) => {
  const [referral, setReferral] = useState({
    jobTitle: referralData?.jobTitle || "",
    jobDescription: referralData?.jobDescription || "",
    jobLink: referralData?.jobLink || "",
    location: referralData?.location || "",
    companyName: referralData?.companyName || "",
    jobCategory: referralData?.jobCategory || "",
    experienceRequired: referralData?.experienceRequired || "",
  });

  const [errors, setErrors] = useState({});
  const [showReferralCard, setShowReferralCard] = useState(true);

  const validateField = (name, value) => {
    const fieldErrors = {};
    if (name === "jobTitle" && !value.trim()) {
      fieldErrors.jobTitle = "* Job title is required.";
    }
    if (name === "jobLink" && !value.trim()) {
      fieldErrors.jobLink = "* Job link is required.";
    } else if (name === "jobLink" && !/^(https?:\/\/)/.test(value.trim())) {
      fieldErrors.jobLink =
        "* Enter a valid URL starting with http:// or https://.";
    }
    if (name === "companyName" && !value.trim()) {
      fieldErrors.companyName = "* Company name is required.";
    }
    return fieldErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferral((prev) => ({ ...prev, [name]: value }));
    const fieldErrors = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name] || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = {
      ...validateField("jobTitle", referral.jobTitle),
      ...validateField("jobLink", referral.jobLink),
      ...validateField("companyName", referral.companyName),
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
    } else {
      console.log("Referral Submitted:", referral);
      setReferral({
        jobTitle: "",
        jobDescription: "",
        jobLink: "",
        location: "",
        companyName: "",
        jobCategory: "",
        experienceRequired: "",
      });
      setErrors({});
    }
  };

  return (
    showReferralCard && (
      <div className="referral-model">
        <div className="referral-card">
          <button
            type="button"
            className="edu-close-button"
            onClick={toggleReferralModel}
          >
            <IoClose size={24} />
          </button>
          <div className="referral-card-container">
            <h2 className="referral-title">Referral Details</h2>

            <form className="referral-form" onSubmit={handleSubmit}>
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
                  <span className="personal-error-text">
                    {errors.companyName}
                  </span>
                )}
              </div>

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

              <div className="referral-form-group">
                <label>Job Category</label>
                <select
                  name="jobCategory"
                  value={referral.jobCategory}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "14px" }}
                >
                  <option value="" style={{ color: "#d1d5db" }}>
                    Select a job category
                  </option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                  <option value="Mobile App Developer">
                    Mobile App Developer
                  </option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Machine Learning Engineer">
                    Machine Learning Engineer
                  </option>
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Cybersecurity Analyst">
                    Cybersecurity Analyst
                  </option>
                  <option value="Blockchain Developer">
                    Blockchain Developer
                  </option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Marketing Specialist">
                    Marketing Specialist
                  </option>
                  <option value="SEO Specialist">SEO Specialist</option>
                  <option value="Business Analyst">Business Analyst</option>
                  <option value="Technical Writer">Technical Writer</option>
                  <option value="Quality Assurance Engineer">
                    Quality Assurance Engineer
                  </option>
                  <option value="System Administrator">
                    System Administrator
                  </option>
                  <option value="Database Administrator">
                    Database Administrator
                  </option>
                  <option value="Embedded Systems Engineer">
                    Embedded Systems Engineer
                  </option>
                  <option value="Game Developer">Game Developer</option>
                </select>
              </div>

              <div className="referral-form-group">
                <label>Experience Required</label>
                <input
                  type="text"
                  name="experienceRequired"
                  value={referral.experienceRequired}
                  onChange={handleChange}
                  placeholder="Enter experience required (e.g., 2 years)"
                />
              </div>

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
              <div className="referral-form-group">
                <label>Job Description</label>
                <textarea
                  name="jobDescription"
                  value={referral.jobDescription}
                  onChange={handleChange}
                  placeholder="Enter job description"
                />
                <p className="exp-help-text" style={{ paddingTop: "10px" }}>
                  Example: Describe key responsibilities, technologies used, and
                  achievements during your role.
                </p>
              </div>

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

export default ReferralModel;
