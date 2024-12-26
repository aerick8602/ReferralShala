import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import '../../styles/EducationModel.css';
import axios from 'axios';

const EducationModel = ({ toggleModal,education,addEducationData}) => {
  const [formData, setFormData] = useState({
    instituteName: education?.instituteName || '',
    degree: education?.degree || '',
    stream: education?.stream || '',
    startYear: education?.startYear || '',
    endYear: education?.endYear || '',
    isCurrentlyEducating: education?.isCurrentlyEducating || false,
    grade: education?.grade?.percentage ? 'percentage' : education?.grade?.CGPA ? 'CGPA' : '',
    gradePercentage: education?.grade.percentage || '',
    gradeCGPA: education?.grade.CGPA || '',
  });

  const [errors, setErrors] = useState({
    instituteName: '',
    degree: '',
    stream: '',
    startYear: '',
    endYear: '',
    grade: '',
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'grade') {
      setFormData({
        ...formData,
        [name]: value,
        gradePercentage: formData.gradePercentage,
        gradeCGPA: formData.gradeCGPA,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }

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
    } else if (name === 'stream') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        stream: value === '' ? '* Stream is required' : '',
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
      if (formData.grade === 'percentage' && name === 'gradePercentage') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          grade:
            value < 0 || value > 100
              ? '* Percentage must be between 0 and 100'
              : '',
        }));
      } else if (formData.grade === 'CGPA' && name === 'gradeCGPA') {
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
    if (
      !formData.instituteName ||
      !formData.degree ||
      !formData.stream ||
      !formData.startYear ||
      (formData.grade === 'percentage' && !formData.gradePercentage) ||
      (formData.grade === 'CGPA' && !formData.gradeCGPA)
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (Object.values(errors).some((error) => error !== '')) {
      alert('Please fix the errors before submitting');
      return;
    }
    addEducationData(formData);
    toggleModal();

  };

  
  


  return (
    <div className="edu-model">
      <div className="edu-card">
        <button
          type="button"
          className="edu-close-button"
          onClick={toggleModal}
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
            <option value="" style={{ color: '#d1d5db' }}>Select a degree</option>
<option value="Bachelor of Technology (BTech)">Bachelor of Technology (BTech)</option>
<option value="Bachelor of Science (BSc)">Bachelor of Science (BSc)</option>
<option value="Master of Science (MSc)">Master of Science (MSc)</option>
<option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
<option value="Master of Arts (MA)">Master of Arts (MA)</option>
<option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>

            </select>
            {errors.degree && <p className="edu-error-text">{errors.degree}</p>}
          </div>

          <div className="edu-form-group">
            <label htmlFor="stream">Stream</label>
            <input
              type="text"
              id="stream"
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              placeholder="Enter stream"
              required
            />
            {errors.stream && <p className="edu-error-text">{errors.stream}</p>}
          </div>

          <div className="edu-info-text">
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              Example: If your degree is BTech in Electrical Engineering, then select Bachelor of Technology (BTech) in degree and Electrical Engineering as stream.
            </p>
          </div>

          <div className="edu-form-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                min={years[years.length - 1]}
                max={currentYear}
                maxLength="4"
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
                  min={formData.startYear}
                  max={currentYear}
                  maxLength="4"
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
              <label htmlFor="grade">Grade</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="percentage">Percentage</option>
                <option value="CGPA">CGPA</option>
              </select>
            </div>

            <div className="edu-form-group" style={{ width: '220px' }}>
              {formData.grade === 'percentage' ? (
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
          </div>
          <button type="submit" className="edu-update-button">
              Save 
            </button>
        </form>
      </div>
    </div>
  );
};

export default EducationModel;
