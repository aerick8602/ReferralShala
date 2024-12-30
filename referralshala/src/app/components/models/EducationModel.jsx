import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import '../../styles/EducationModel.css';
import { v4 as uuidv4 } from 'uuid';

const EducationModel = ({ 
  currentEducation,
  educationData,
  setEducationData,
  addEducationData, 
  updateEducationData,
  toggleEducationModel
 }) => {
  const [formData, setFormData] = useState({
    instituteName: currentEducation?.instituteName || '',
    degree: currentEducation?.degree || '',
    stream: currentEducation?.stream || '',
    startYear: currentEducation?.startYear || '',
    endYear: currentEducation?.endYear || '',
    isCurrentlyEducating: currentEducation?.isCurrentlyEducating || false,
    grade: currentEducation?.grade?.percentage ? 'percentage' : currentEducation?.grade?.cgpa ? 'cgpa' : 'percentage',
    gradePercentage: currentEducation?.grade?.percentage || '',
    gradeCGPA: currentEducation?.grade?.cgpa || '',
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'gradePercentage' || name === 'gradeCGPA') {
      setFormData({
        ...formData,
        [name]: value,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveOrUpdate = async (e) => {
    e.preventDefault();
  
    if (
      !formData.instituteName ||
      !formData.degree ||
      !formData.stream ||
      !formData.startYear ||
      (formData.grade === 'percentage' && !formData.gradePercentage) ||
      (formData.grade === 'cgpa' && !formData.gradeCGPA)
    ) {
      alert('Please fill all required fields.');
      return;
    }
  
    const newEducationData = {
      educationId: currentEducation?.educationId || uuidv4(),
      instituteName: formData.instituteName,
      degree: formData.degree,
      stream: formData.stream,
      startYear: parseInt(formData.startYear, 10),
      endYear: formData.endYear ? parseInt(formData.endYear, 10) : null,
      isCurrentlyEducating: formData.isCurrentlyEducating,
      grade: {
        percentage: formData.grade === 'percentage' ? parseFloat(formData.gradePercentage) : undefined,
        cgpa: formData.grade === 'cgpa' ? parseFloat(formData.gradeCGPA) : undefined,
      },
    };
  
    const updatedEducationData = Array.isArray(educationData) ? [...educationData] : [];
  
    if (currentEducation) {
      const updatedData = updatedEducationData.map((edu) =>
        edu.educationId === newEducationData.educationId ? newEducationData : edu
      );
      setEducationData(updatedData);
      if (updateEducationData) updateEducationData(newEducationData);
      toggleEducationModel();
    } else {
      updatedEducationData.push(newEducationData);
      setEducationData(updatedEducationData);
      toggleEducationModel();
      if (addEducationData) {
        const response = await addEducationData(newEducationData);
        console.log(response);
        if (response.data?.educationId) {
          const updatedDataWithId = updatedEducationData.map((edu) =>
            edu.educationId === newEducationData.educationId
              ? { ...edu, educationId: response.data.educationId }
              : edu
          );
          setEducationData(updatedDataWithId);
        }
      }
    }
  };

  return (
    <div className="edu-model">
      <div className="edu-card">
        <button
          type="button"
          className="edu-close-button"
          onClick={toggleEducationModel}
        >
          <IoClose size={24} />
        </button>

        <h2 className="edu-title">Education Details</h2>
          <form onSubmit={handleSaveOrUpdate} className="edu-form">
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
                    // max={currentYear}
                    maxLength="4"
                    required
                  />
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
                  <option value="cgpa">CGPA</option>
                </select>
              </div>

              <div className="edu-form-group" style={{ width: '220px' }}>
                {formData.grade === 'percentage' ? (
                  <>
                    <label htmlFor="gradePercentage">percentage</label>
                    <input
                      type="number"
                      step="0.01"
                      id="gradePercentage"
                      name="gradePercentage"
                      value={formData.gradePercentage}
                      onChange={handleChange}
                      placeholder="Enter percentage (out of 100)"
                      min="0"
                      max="100"
                      required
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="gradeCGPA">cgpa</label>
                    <input
                      type="number"
                      step="0.01"
                      id="gradeCGPA"
                      name="gradeCGPA"
                      value={formData.gradeCGPA}
                      onChange={handleChange}
                      placeholder="Enter cgpa (out of 10)"
                      min="0"
                      max="10"
                      required
                    />
                  </>
                )}
              </div>
            </div>

            <button type="submit" className="edu-update-button">
              {updateEducationData ? 'Update' : 'Save'}
            </button>
          </form>
      </div>
    </div>
  );
};

export default EducationModel;
