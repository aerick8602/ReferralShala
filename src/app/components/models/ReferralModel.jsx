import React, { useState } from "react";
import "../../styles/ReferralModel.css";
import { IoClose } from "react-icons/io5";

const ReferralModel = ({
  getReferrals,
  isEditing,
  referralData,
  setReferralData,
  toggleReferralModel,
  addReferral,
  updateReferral,
}) => {
  const [referral, setReferral] = useState({
    jobTitle: referralData?.jobTitle || "",
    jobDescription: referralData?.jobDescription || "",
    jobLink: referralData?.jobLink || "",
    location: referralData?.location || "",
    companyName: referralData?.companyName || "",
    jobCategory: referralData?.jobCategory || "",
    experienceRequired: referralData?.experienceRequired || 0,
  });

  const [showReferralCard, setShowReferralCard] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure experienceRequired only accepts integers
    if (name === "experienceRequired") {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        setReferral((prev) => ({ ...prev, [name]: "" })); // Clear input if not a number
      } else {
        setReferral((prev) => ({ ...prev, [name]: intValue }));
      }
    } else {
      setReferral((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleReferralModel();

    if (isEditing) {
      // Update referral
      const updatedReferral = await updateReferral(
        referralData.referralId,
        referral
      );
      if (updatedReferral) {
        setReferralData((prevData) =>
          prevData.map((item) =>
            item.referralId === updatedReferral.referralId
              ? updatedReferral
              : item
          )
        );
      }
    } else {
      const newReferral = await addReferral(referral);
    }
    getReferrals();
  };

  return (
    showReferralCard && (
      <div className="referral-model">
        <div className="referral-card-model">
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
                  required
                />
              </div>

              <div className="referral-form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={referral.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  required
                />
              </div>

              <div className="referral-form-group">
                <label>Job Category</label>
                <select
                  name="jobCategory"
                  value={referral.jobCategory}
                  onChange={handleChange}
                  style={{ fontSize: "14px" }}
                >
                  <option value="">Select a job category</option>
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
                  required
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
                  required
                />
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
                {isEditing == true ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ReferralModel;
