import React, { useState } from 'react';
import '../../styles/ExperienceModel.css';
import { IoClose } from 'react-icons/io5';

const ExperienceModel = ({ onSubmit,toggleModal,experience }) => {
  const [formData, setFormData] = useState({
    companyName: experience?.companyName,
    role: experience?.role,
    location: experience?.location,
    startYear: experience?.startYear,
    endYear:experience?.endYear,
    isCurrentlyEmployed: experience?.isCurrentlyEmployed,
    description: experience?.description,
  });

    

  const [errors, setErrors] = useState({
    companyName: '',
    role: '',
    location: '',
    startYear: '',
    endYear: '',
  });

  const [isOpen, setIsOpen] = useState(true); // State to control the overlay visibility

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Error handling and removal of error logic
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (name === 'companyName') {
        updatedErrors.companyName = value === '' ? '* Company name is required' : '';
      }

      if (name === 'role') {
        updatedErrors.role = value === '' ? '* Role is required' : '';
      }

      if (name === 'location') {
        updatedErrors.location = value === '' ? '* Location is required' : '';
      }

      if (name === 'startYear') {
        if (value.length !== 4 || isNaN(value)) {
          updatedErrors.startYear = '* Start year is invalid';
        } else if (value < years[years.length - 1] || value > currentYear) {
          updatedErrors.startYear = `* Start year must be between ${years[years.length - 1]} and ${currentYear}`;
        } else {
          updatedErrors.startYear = '';
        }
      }

      if (name === 'endYear') {
        if (value.length !== 4 || isNaN(value)) {
          updatedErrors.endYear = '* End year is invalid';
        } else if (value < formData.startYear || value > currentYear) {
          updatedErrors.endYear = `* End year must be before ${currentYear}`;
        } else {
          updatedErrors.endYear = '';
        }
      }

      return updatedErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== '') || Object.values(formData).some((field) => field === '')) {
      alert('Please fix the errors before submitting');
      return;
    }
    onSubmit(formData);
  };

  const closeCard = () => {
    setIsOpen(false); // Close the overlay
  };

  // Render null when the card is closed
  if (!isOpen) return null;

  return (
    <div className="exp-model">
      <div className="exp-card">
        <button
          type="button"
          className="edu-close-button"
          onClick={toggleModal} // Close card on click
        >
          <IoClose size={24} />
        </button>
        <h2 className="exp-title">Work Experience Details</h2>
        <form onSubmit={handleSubmit} className="exp-form">
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
            {errors.companyName && <p className={`error-text ${errors.companyName ? 'active' : ''}`}>{errors.companyName}</p>}
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
            {errors.role && <p className={`error-text ${errors.role ? 'active' : ''}`}>{errors.role}</p>}
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
            {errors.location && <p className={`error-text ${errors.location ? 'active' : ''}`}>{errors.location}</p>}
          </div>

          <div className="exp-form-row" style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
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
              {errors.startYear && <p className={`error-text ${errors.startYear ? 'active' : ''}`}>{errors.startYear}</p>}
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
                  max={currentYear}
                />
                {errors.endYear && <p className={`error-text ${errors.endYear ? 'active' : ''}`}>{errors.endYear}</p>}
              </div>
            )}
          </div>

          <div className="exp-form-group exp-checkbox-group" style={{ display: 'flex', flexDirection: 'row', fontSize: '12px' }}>
            <label htmlFor="isCurrentlyEmployed" style={{}}>Currently working here</label>
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

          <button type="submit" className="exp-update-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModel;
