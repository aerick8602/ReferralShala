import React, { useEffect, useState } from "react";
import "../../styles/PersonalCard.css";
import { FaPlus, FaTrashAlt, FaTimes, FaCamera } from "react-icons/fa";

const PersonalCard = ({
  userData,
  candidateData,
  setUserData,
  setCandidateData,
  togglePersonalModel,
  updateUserData
}) => {
  useEffect(()=>{
    console.log(userData);
    console.log(candidateData);
  },[]);
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    contactNumber: candidateData.contactNumber,
    location: candidateData.location,
    socialLinks: candidateData.socialLinks,
    profileImage: userData.profileImage || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (index, e) => {
    const { name, value } = e.target;
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks[index][name] = value;
    setFormData((prev) => ({ ...prev, socialLinks: newSocialLinks }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", link: "" }],
    }));
  };

  const removeSocialLink = (index) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks.splice(index, 1);
    setFormData((prev) => ({ ...prev, socialLinks: newSocialLinks }));
  };

  const removeProfileImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: null }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);
  
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToUpload,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const result = await response.json();
      const imagePath = result.filePath;
      console.log("imagePath", imagePath);
  
      const updatedFormData = {
        ...formData,
        profileImage: imagePath, 
      };
      setFormData(updatedFormData); 
      setUserData((prevData) => ({
        ...prevData, 
        firstName: formData.firstName, 
        lastName: formData.lastName,
        profileImage: formData.profileImage,
      }));
    }
    else{
      setUserData((prevData) => ({
        ...prevData, 
        firstName: formData.firstName, 
        lastName: formData.lastName,
        profileImage: null
      }));
      updateUserData(formData.firstName,formData.lastName,null);
    }

    
    

    // console.log("Updated Form Data:", updatedFormData);

    togglePersonalModel();
  };

  const [file, setFile] = useState();

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="personal-card">
      <div className="personal-card-container">
        <button
          type="button"
          className="edu-close-button"
          onClick={togglePersonalModel}
        >
          <FaTimes size={18} />
        </button>
        <h2 className="personal-title">Personal Details</h2>

        <form className="personal-form" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="personal-form-group">
            <label>Profile Image</label>
            <div className="profile-image-upload">
              {formData.profileImage ? (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="profile-image-preview"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeProfileImage}
                    className="remove-btn"
                    style={{ marginTop: "-3px", fontSize: "14px" }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <label
                    htmlFor="file"
                    className="file-label"
                    style={{ margin: "8px" }}
                  >
                    <FaCamera size={24} />
                  </label>
                  <input
                    style={{ width: "220px" }}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="profile-image-input"
                  />
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="personal-form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                style={{ width: "260px" }}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="personal-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                style={{ width: "260px" }}
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="personal-form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Enter your 10-digit contact number"
              pattern="\d{10}" // Ensure this is correctly escaped
              title="Please enter a valid 10-digit contact number."
              required
            />
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
          </div>

          {/* Social Links */}
          <div
            className="personal-form-group"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <label>Social Links</label>
            <button
              type="button"
              onClick={addSocialLink}
              style={{ color: "#4b5563" }}
            >
              <FaPlus size={20} />
            </button>
          </div>

          {formData.socialLinks.map((social, index) => (
            <div
              key={index}
              className="personal-form-group"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "0px",
              }}
            >
              <div
                className="social-input-container"
                style={{
                  marginBottom: "8px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "500px", display: "flex", gap: "20px" }}>
                  <input
                    type="text"
                    name="platform"
                    value={social.platform}
                    onChange={(e) => handleSocialLinkChange(index, e)}
                    placeholder="Platform"
                    className="social-input"
                    required
                  />
                  <input
                    style={{ width: "300px" }}
                    type="url"
                    name="link"
                    value={social.link}
                    onChange={(e) => handleSocialLinkChange(index, e)}
                    placeholder="Enter a valid URL"
                    className="social-input"
                    pattern="https?://.+"
                    title="Please enter a valid URL starting with http:// or https://."
                    required
                  />
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeSocialLink(index)}
                >
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