import React, { useState } from "react";

const PersonalCard = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    location: "",
    socialLinks: [{ platform: "", link: "" }],
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

  return (
    <div className="personal-card p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
      <form>
        <div className="mb-4">
          <label className="block font-medium mb-1">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Contact Number (Optional)</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            pattern="\d{10}"
            placeholder="10-digit number"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <h3 className="text-xl font-bold mb-2">Social Links</h3>
        {formData.socialLinks.map((social, index) => (
          <div key={index} className="mb-4 flex items-center gap-2">
            <input
              type="text"
              name="platform"
              value={social.platform}
              onChange={(e) => handleSocialLinkChange(index, e)}
              className="w-1/3 p-2 border rounded"
              placeholder="Platform"
            />
            <input
              type="text"
              name="link"
              value={social.link}
              onChange={(e) => handleSocialLinkChange(index, e)}
              className="w-2/3 p-2 border rounded"
              placeholder="URL"
            />
            <button
              type="button"
              onClick={() => removeSocialLink(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSocialLink}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Social Link
        </button>
      </form>
    </div>
  );
};

export default PersonalCard;
