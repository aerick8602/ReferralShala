import React, { useState } from "react";
import "../../styles/PersonalCard.css";
import { FaPlus, FaTrashAlt, FaTimes, FaCamera } from "react-icons/fa";

const PersonalCard = ({ userData, candidateData, toggleModal }) => {
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    contactNumber: candidateData.contactNumber,
    location: candidateData.location,
    socialLinks: candidateData.socialLinks,
    profileImage: userData.profileImage || "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    location: "",
    socialLinks: [{ platform: "", link: "" }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      return updatedFormData;
    });

    // Real-time validation for fields
    if (name === "firstName" || name === "lastName") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value === "" ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : "",
      }));
    } else if (name === "contactNumber") {
      const phonePattern = /^[0-9]{10}$/; // Example: validate 10 digit phone number
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactNumber: !phonePattern.test(value) ? "* Contact number must be 10 digits" : "",
      }));
    } else if (name === "location") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: value === "" ? "* Location is required" : "",
      }));
    }
  };

  const handleSocialLinkChange = (index, e) => {
    const { name, value } = e.target;
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks[index][name] = value;

    setFormData((prev) => {
      const updatedFormData = { ...prev, socialLinks: newSocialLinks };
      return updatedFormData;
    });

    // Error handling for social links
    const newErrors = [...errors.socialLinks];
    if (name === "platform" || name === "link") {
      newErrors[index] = {
        platform: newSocialLinks[index].platform === "" ? "* Platform is required" : "",
        link: newSocialLinks[index].link === "" ? "* URL is required" : "",
      };
      setErrors((prevErrors) => ({ ...prevErrors, socialLinks: newErrors }));
    }
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", link: "" }],
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      socialLinks: [...prevErrors.socialLinks, { platform: "", link: "" }],
    }));
  };

  const removeSocialLink = (index) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks.splice(index, 1);
    setFormData((prev) => ({ ...prev, socialLinks: newSocialLinks }));

    const newErrors = [...errors.socialLinks];
    newErrors.splice(index, 1);
    setErrors((prevErrors) => ({ ...prevErrors, socialLinks: newErrors }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update formData with the image URL
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: "" })); // Clear the profile image
  };

  const handleSubmit = (e) => {
    console.log("FORM DATA :",formData);
    e.preventDefault();

    // Check if any field has an error
    if (Object.values(errors).some((error) => error !== "")) {
      alert("Please fix the errors before submitting.");
      return;
    }

    // Check if required fields are empty
    if (!formData.firstName || !formData.lastName || !formData.contactNumber || !formData.location) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Form submitted successfully!");
  };

  return (
    <div className="personal-card">
      <div className="personal-card-container">
        <button onClick={toggleModal} className="edu-lose-btn">
          <FaTimes size={20} />
        </button>
        <h2 className="personal-title">Personal Details</h2>

        <form className="personal-form" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="personal-form-group">
            <label>Profile Image</label>
            <div className="profile-image-upload">
              {formData.profileImage ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <img src={formData.profileImage} alt="Profile" className="profile-image-preview" style={{ width: '40px', height: '40px' ,borderRadius:'50px'}} />
                    <button type="button" onClick={removeProfileImage} className="remove-btn" style={{ marginTop: '-3px', fontSize: '14px' }}>
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label htmlFor="file" className="file-label" style={{ margin: '8px' }}>
                      <FaCamera size={24} />
                    </label>
                    <input
                      style={{ width: '220px' }}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="profile-image-input"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div className="personal-form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                style={{ width: '260px' }}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="personal-error-text">{errors.firstName}</p>}
            </div>

            <div className="personal-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                style={{ width: '260px' }}
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="personal-error-text">{errors.lastName}</p>}
            </div>
          </div>

          <div className="personal-form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="number"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Enter your contact number"
            />
            {errors.contactNumber && <p className="personal-error-text">{errors.contactNumber}</p>}
          </div>

          <div className="personal-form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter your location"
            />
            {errors.location && <p className="personal-error-text">{errors.location}</p>}
          </div>

          {/* Social Links */}
          <div className="personal-form-group" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <label>Social Links</label>
            <button type="button" onClick={addSocialLink} style={{ color: "#4b5563" }}>
              <FaPlus size={20} />
            </button>
          </div>

          {formData.socialLinks.map((social, index) => (
            <div key={index} className="personal-form-group" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "0px" }}>
              <div className="social-input-container" style={{ marginBottom: "8px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '500px', display: 'flex', gap: '20px' }}>
                  <input
                    type="text"
                    name="platform"
                    value={social.platform}
                    onChange={(e) => handleSocialLinkChange(index, e)}
                    placeholder="Platform"
                    className="social-input"
                  />
                  {errors.socialLinks[index]?.platform && (
                    <p className="personal-error-text">{errors.socialLinks[index].platform}</p>
                  )}
                  <input
                    style={{ width: '300px' }}
                    type="text"
                    name="link"
                    value={social.link}
                    onChange={(e) => handleSocialLinkChange(index, e)}
                    placeholder="URL"
                    className="social-input"
                  />
                  {errors.socialLinks[index]?.link && (
                    <p className="personal-error-text">{errors.socialLinks[index].link}</p>
                  )}
                </div>
                <button type="button" className="remove-btn" onClick={() => removeSocialLink(index)}>
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>
          ))}

          <button type="submit" className="edu-update-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalCard;
