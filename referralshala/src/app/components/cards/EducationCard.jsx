import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';  // Import the close icon
import '../../styles/EducationCard.css';

const EducationCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    instituteName: '',
    degree: '',
    specialization: '',
    startYear: '',
    endYear: '',
    isCurrentlyEducating: false,
    gradeType: '', // 'percentage' or 'cgpa'
    gradePercentage: '', // Percentage value
    gradeCGPA: '', // CGPA value
  });

  const [errors, setErrors] = useState({
    instituteName: '',
    degree: '',
    specialization: '',
    startYear: '',
    endYear: '',
    grade: '',
  });

  const [isOpen, setIsOpen] = useState(true); // State to control the overlay visibility

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i); // Generate years from current year to 50 years ago

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'gradeType') {
      setFormData({
        ...formData,
        [name]: value,
        gradePercentage: '', // Reset percentage field when switching to CGPA
        gradeCGPA: '', // Reset CGPA field when switching to percentage
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }

    // Real-time validation and removing errors once valid
    if (name === 'instituteName') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        instituteName: value === '' ? '* Institute name is required' : '',
      }));
    } else if (name === 'degree') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        degree: value === '' ? '* Degree is required' : '',
      }));
    } else if (name === 'specialization') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        specialization: value === '' ? '* Specialization is required' : '',
      }));
    } else if (name === 'startYear') {
      if (value.length !== 4 || isNaN(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          startYear: '* Enter a valid year',
        }));
      } else if (value < years[years.length - 1] || value > currentYear) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          startYear: `* Start year must be between ${years[years.length - 1]} and ${currentYear}`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          startYear: '',
        }));
      }
    } else if (name === 'endYear') {
      if (value.length !== 4 || isNaN(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          endYear: '* Enter a valid year',
        }));
      } else if (value < formData.startYear || value > currentYear) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          endYear: `* End year must be between ${formData.startYear} and ${currentYear}`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          endYear: '',
        }));
      }
    } else if (name === 'gradePercentage' || name === 'gradeCGPA') {
      if (formData.gradeType === 'percentage' && name === 'gradePercentage') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          grade:
            value < 0 || value > 100
              ? '* Percentage must be between 0 and 100'
              : '',
        }));
      } else if (formData.gradeType === 'cgpa' && name === 'gradeCGPA') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          grade:
            value < 0 || value > 10
              ? '* CGPA must be between 0 and 10'
              : '',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          grade: '',
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields (required fields)
    if (
      !formData.instituteName ||
      !formData.degree ||
      !formData.specialization ||
      !formData.startYear ||
      (formData.gradeType === 'percentage' && !formData.gradePercentage) ||
      (formData.gradeType === 'cgpa' && !formData.gradeCGPA)
    ) {
      alert('Please fill all required fields');
      return;
    }

    // Check for validation errors
    if (Object.values(errors).some((error) => error !== '')) {
      alert('Please fix the errors before submitting');
      return;
    }

    // Submit the form data
    onSubmit(formData);
  };

  const closeCard = () => {
    setIsOpen(false); // Close the overlay
  };

  if (!isOpen) return null; // Return nothing if the overlay is closed

  return (
    <div className="edu-model">
      <div className="edu-card">
        <button
          type="button"
          className="edu-close-button"
          onClick={closeCard} // Close card on click
        >
          <IoClose size={24} />
        </button>

        <h2 className="edu-title">Education Details</h2>
        <form onSubmit={handleSubmit} className="edu-form">

          <div className="edu-form-group">
            <label htmlFor="instituteName">Institute Name</label>
            <input
              type="text"
              id="instituteName"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              placeholder="Enter institute name"
              required
            />
            {errors.instituteName && <p className="edu-error-text">{errors.instituteName}</p>}
          </div>

          <div className="edu-form-group">
            <label htmlFor="degree">Degree</label>
            <select
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
            >
              <option value="" style={{color:'#d1d5db'}}>Select a degree</option>
              <option value="BTech">BTech</option>
              <option value="BSc">BSc</option>
              <option value="MSc">MSc</option>
              <option value="BA">BA</option>
              <option value="MA">MA</option>
              <option value="MBA">MBA</option>
              {/* Add more degree options as needed */}
            </select>
            {errors.degree && <p className="edu-error-text">{errors.degree}</p>}
          </div>

          <div className="edu-form-group">
            <label htmlFor="specialization">Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Enter specialization"
              required
            />
            {errors.specialization && <p className="edu-error-text">{errors.specialization}</p>}
          </div>

          {/* Add text for degree explanation */}
          <div className="edu-info-text">
            <p style={{fontSize: '13px', color: '#6b7280'}}>
              Example: If your degree is B.Tech in Electrical Engineering, then select Bachelor of Technology (B.Tech) in degree and Electrical Engineering as specialization. 
            </p>
          </div>

          <div className="edu-form-row" style={{display:'flex',justifyContent:'space-between'}}>
            <div className="edu-form-group">
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
                min={years[years.length - 1]} // Minimum year available
                max={currentYear} // Maximum year should be current year
                maxLength="4" // Limit input to 4 digits
              />
              {errors.startYear && <p className="edu-error-text">{errors.startYear}</p>}
            </div>

            {!formData.isCurrentlyEducating && (
              <div className="edu-form-group">
                <label htmlFor="endYear">End Year (Optional)</label>
                <input
                  style={{ width: '240px' }}
                  type="number"
                  id="endYear"
                  name="endYear"
                  value={formData.endYear}
                  onChange={handleChange}
                  placeholder="Enter end year YYYY"
                  min={formData.startYear} // Ensure end year is after start year
                  max={currentYear} // Maximum year should be current year
                  maxLength="4" // Limit input to 4 digits
                />
                {errors.endYear && <p className="edu-error-text">{errors.endYear}</p>}
              </div>
            )}
          </div>

          <div className="edu-form-group edu-checkbox-group" style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', marginTop: '-8px' }}>
            <label htmlFor="isCurrentlyEducating">Currently studying here</label>
            <input
              style={{ marginTop: '3px' }}
              type="checkbox"
              id="isCurrentlyEducating"
              name="isCurrentlyEducating"
              checked={formData.isCurrentlyEducating}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <div className="edu-form-group">
              <label htmlFor="gradeType">Grade</label>
              <select
                id="gradeType"
                name="gradeType"
                value={formData.gradeType}
                onChange={handleChange}
                required
              >
                <option value="percentage">Percentage</option>
                <option value="cgpa">CGPA</option>
              </select>
            </div>

            {formData.gradeType && (
              <div className="edu-form-group" style={{ width: '220px' }}>
                {formData.gradeType === 'percentage' ? (
                  <>
                    <label htmlFor="gradePercentage">Percentage</label>
                    <input
                      type="number"
                      id="gradePercentage"
                      name="gradePercentage"
                      value={formData.gradePercentage}
                      onChange={handleChange}
                      placeholder="Enter percentage (out of 100)"
                      required
                      min="0"
                      max="100"
                    />
                    {errors.grade && <p className="edu-error-text">{errors.grade}</p>}
                  </>
                ) : (
                  <>
                    <label htmlFor="gradeCGPA">CGPA</label>
                    <input
                      type="number"
                      id="gradeCGPA"
                      name="gradeCGPA"
                      value={formData.gradeCGPA}
                      onChange={handleChange}
                      placeholder="Enter CGPA (out of 10)"
                      required
                      min="0"
                      max="10"
                    />
                    {errors.grade && <p className="edu-error-text">{errors.grade}</p>}
                  </>
                )}
              </div>
            )}
          </div>
          <button type="submit" className="edu-update-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducationCard;
