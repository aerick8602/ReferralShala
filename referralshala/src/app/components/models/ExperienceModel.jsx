import React, { useState } from 'react';
import '../../styles/ExperienceModel.css';
import { IoClose } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

const ExperienceModel = ({ 
  currentExperience, 
  experienceData, 
  setExperienceData, 
  addExperienceData, 
  updateExperienceData,
  toggleExperienceModel, 
}) => {
  const [formData, setFormData] = useState({
    companyName: currentExperience?.companyName || '',
    role: currentExperience?.role || '',
    location: currentExperience?.location || '',
    startYear: currentExperience?.startYear || '',
    endYear: currentExperience?.endYear || '',
    isCurrentlyEmployed: currentExperience?.isCurrentlyEmployed || false,
    description: currentExperience?.description || '',
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveOrUpdate = async (e) => {
    e.preventDefault();
  
    if (
      !formData.companyName ||
      !formData.role ||
      !formData.location ||
      !formData.startYear 
    ) {
      alert('Please fill all required fields.');
      return;
    }
  
    const newExperienceData = {
      experienceId: currentExperience?.experienceId || uuidv4(),
      companyName: formData?.companyName || '',
      role: formData?.role || '',
      location: formData?.location || '',
      startYear: parseInt(formData?.startYear) || '',
      endYear: parseInt(formData?.endYear) || null,
      isCurrentlyEmployed: formData?.isCurrentlyEmployed || false,
      description: formData?.description || null
    };
  
    // Ensure experienceData is always an array
    const updatedExperienceData = Array.isArray(experienceData) ? [...experienceData] : [];
  
    if (currentExperience) {
      // Update existing experience
      const updatedData = updatedExperienceData.map((exp) =>
        exp.experienceId === newExperienceData.experienceId ? newExperienceData : exp
      );
      setExperienceData(updatedData);
      toggleExperienceModel();
      if (updateExperienceData) updateExperienceData(newExperienceData);
    } else {
      // Add new experience
      const newData = [...updatedExperienceData, newExperienceData];
      setExperienceData(newData);
      toggleExperienceModel();
      if (addExperienceData) {
        const response = await addExperienceData(newExperienceData); // Assuming this returns a response with the actual experienceId
          console.log(response.data);
  
          // If the response contains the actual experienceId, update the experience data
          if (response.data?.experienceId) {
            const updatedDataWithId = newData.map((exp) =>
              exp.experienceId === newExperienceData.experienceId
                ? { ...exp, experienceId: response.data.experienceId }
                : exp
            );
            setExperienceData(updatedDataWithId);
          }
      }
    }
  };
  

  return (
    <div className="exp-model">
      <div className="exp-card">
        <button type="button" className="edu-close-button" onClick={toggleExperienceModel}>
          <IoClose size={24} />
        </button>
        <h2 className="exp-title">Work Experience Details</h2>
        <form onSubmit={handleSaveOrUpdate} className="exp-form">
          <div className="exp-form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="exp-form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter your role"
              required
            />
          </div>

          <div className="exp-form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter job location"
              required
            />
          </div>

          <div className="exp-form-row" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="exp-form-group">
              <label htmlFor="startYear">Start Year</label>
              <input
                style={{ width: '240px' }}
                type="number"
                id="startYear"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                placeholder="Enter start year YYYY"
                required
                min={years[years.length - 1]}
                max={currentYear}
              />
            </div>

            {!formData.isCurrentlyEmployed && (
              <div className="exp-form-group">
                <label htmlFor="endYear">End Year (Optional)</label>
                <input
                  style={{ width: '240px' }}
                  type="number"
                  id="endYear"
                  name="endYear"
                  value={formData.endYear}
                  onChange={handleChange}
                  placeholder="Enter end year YYYY"
                  min={formData.startYear}
                  // max={currentYear}
                  required
                />
              </div>
            )}
          </div>

          <div className="exp-form-group exp-checkbox-group" style={{ display: 'flex', flexDirection: 'row', fontSize: '12px' }}>
            <label htmlFor="isCurrentlyEmployed">Currently working here</label>
            <input
              style={{ marginTop: '3px' }}
              type="checkbox"
              id="isCurrentlyEmployed"
              name="isCurrentlyEmployed"
              checked={formData.isCurrentlyEmployed}
              onChange={handleChange}
            />
          </div>

          <div className="exp-form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your job responsibilities..."
              rows="5"
            />
          </div>

          <p className="exp-help-text">
            Example: Describe key responsibilities, technologies used, and achievements during your role.
          </p>

          <button type="submit" className="exp-update-button">
            {currentExperience ? "Update" : "Save"} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModel;
