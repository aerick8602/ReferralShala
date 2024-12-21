// 'use client';

//   import '../../../styles/Profile.css';
//   import { useState } from 'react';

//   export default function CandidateProfilePage() {
//     const [preview, setPreview] = useState(null);
//     const [buttonText, setButtonText] = useState('Choose File');

//     const [formData, setFormData] = useState({
//       name: '',
//       dob: '',
//       gender: '',
//       college: '',
//       summary: '',
//       tenthCGPA: '',
//       twelfthCGPA: '',
//       graduationCGPA: '',
//       Job:{companyName:'',from:'',to:''},
//       internships: [{ companyName: '', from: '' }],
//       skills: [''],
//       projects: [{ name: '', skillUsed: '', details: '' }],
//     });

//     const handleFileChange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setPreview(e.target.result);
//           setButtonText('Edit File');
//         };
//         reader.readAsDataURL(file);
//       } else {
//         setPreview(null);
//         setButtonText('Choose File');
//       }
//     };

//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//     };

//     const handleAddInternship = () => {
//       setFormData(prev => ({
//         ...prev,
//         internships: [...prev.internships, { companyName: '', from: '', to: '' }],
//       }));
//     };

//     const handleDeleteInternship = (index) => {
//       const newInternships = [...formData.internships];
//       newInternships.splice(index, 1);
//       setFormData(prev => ({
//         ...prev,
//         internships: newInternships,
//       }));
//     };

//     const handleInternshipChange = (index, event) => {
//       const { name, value } = event.target;
//       const updatedInternships = [...formData.internships];
//       updatedInternships[index] = { ...updatedInternships[index], [name]: value };
//       setFormData(prev => ({
//         ...prev,
//         internships: updatedInternships,
//       }));
//     };

//     const handleSkillChange = (index, event) => {
//       const newSkills = [...formData.skills];
//       newSkills[index] = event.target.value;
//       setFormData(prev => ({
//         ...prev,
//         skills: newSkills,
//       }));
//     };

//     const handleAddSkill = () => {
//       setFormData(prev => ({
//         ...prev,
//         skills: [...prev.skills, ''],
//       }));
//     };
//     const handleDeleteSkill = (index) => {
//       const newSkills = [...formData.skills];
//       newSkills.splice(index, 1);
//       setFormData((prev) => ({
//         ...prev,
//         skills: newSkills,
//       }));
//     };
    

//     const handleProjectChange = (index, event) => {
//       const { name, value } = event.target;
//       const updatedProjects = [...formData.projects];
//       updatedProjects[index] = { ...updatedProjects[index], [name]: value };
//       setFormData(prev => ({
//         ...prev,
//         projects: updatedProjects,
//       }));
//     };
    
//     const handleAddProject = () => {
//       setFormData(prev => ({
//         ...prev,
//         projects: [...prev.projects, { name: '', skillUsed: '', details: '' }],
//       }));
//     };

//     const handleDeleteProject = (index) => {
//       const newProjects = [...formData.projects];
//       newProjects.splice(index, 1);
//       setFormData(prev => ({
//         ...prev,
//         projects: newProjects,
//       }));
//     };

//     const [resumePreview, setResumePreview] = useState(null);
//     const buttonValue = "Choose File";

//     const handleResumeChange = (e) => {
//       const file = e.target.files[0];
//       if (file) {
      
//         if (file.type === "application/pdf") {
//           const fileUrl = URL.createObjectURL(file);
//           setResumePreview(fileUrl);
//         } else {
//           alert("Please upload a valid PDF file.");
//         }
//       }
//     };



//     return (
//       <>
//         <div className="profile-header">Profile</div>

//         <div className="profile">
//           <div className="photo-section">
//             <div className="photo-section-header">Profile Photo</div>
//             <div className="image-preview">
//               {preview ? <img src={preview} alt="Profile Preview" /> : <span>Preview</span>}
//             </div>
//             <label htmlFor="fileInput" className="file-label">{buttonText}</label>
//             <input
//               type="file"
//               id="fileInput"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ display: 'none' }}
//             />
//             <br />
//             <br />
//             <br />
//             {/* <br /> */}
//             <div className="resume-section">
//             <div className="resume-section-header" style={{marginLeft:'50px'}}>Upload Resume</div>
//             <br />
//             <div className="resume-preview">
//               {resumePreview ? (
//                 <a href={resumePreview} target="_blank" rel="noopener noreferrer" className="resume-link" style={{marginLeft:'73px',color:'red',textDecoration:'underline'}}>
//                   View Resume
//                 </a>
//               ) : (
//                 <span >No Preview Available</span>
//                   )}
//             </div>
//             <label htmlFor="resumeInput" className="file-label">
//               {buttonValue}
//             </label>
//             <input
//               type="file"
//               id="resumeInput"
//               accept=".pdf"
//               onChange={handleResumeChange}
//               style={{ display: "none"}}
//             />
//           </div>
//           </div>
          

//           <div className="profile-divide"></div>

//           <div className="info-section">
//             <div className="info-title" >Basic Details</div>
//             <div className="info-about">
//               <div className="about-header">About</div>
//               <hr style={{ backgroundColor: 'black', border: 'none', height: '2px', width: '500px' }} />
//               <br />
//               <label>
//                 Name:
//                 <input type="text" name="name" value={formData.name} style={{marginLeft:'85px'}}onChange={handleChange} />
                
//               </label>
//               <label>
//                 Date of Birth:
//                 <input type="date" name="dob" value={formData.dob} style={{marginLeft:'34px'}} onChange={handleChange} />
              
//               </label>
//               {/* <label>
//                 Gender:
//                 <select name="gender" value={formData.gender} onChange={handleChange}>
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
                
//               </label> */}
//               {/* <br /> */}
//               <label>
//                 College Name:
//                 <input type="text" name="college" value={formData.college} style={{marginLeft:'25px'}}onChange={handleChange} />
              
//               </label>
//             </div>
//             <br />
//             <div className="info-summary">
//               <label>
//                 <div className="summary-header">Summary</div>
//                 <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
//                 <br />
//                 <textarea name="summary" value={formData.summary} onChange={handleChange} rows="5" cols="50" style={{border: '2px solid black', borderRadius:'10px', marginLeft:'130px'}} />
            
//               </label>
//             </div>
//             <br />

//             <div className="info-education">
//               <div className="edu-header">Education</div>
//               <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
//               <label>
//                 10th CGPA:
//                 <input type="number" name="tenthCGPA" value={formData.tenthCGPA} style={{marginLeft:'58px'}}onChange={handleChange} />
              
//               </label>
//               <label>
//                 12th CGPA:
//                 <input type="number" name="twelfthCGPA" value={formData.twelfthCGPA} style={{marginLeft:'58px'}} onChange={handleChange} />
                
//               </label>
//               <label>
//                 Graduation CGPA:
//                 <input type="number" name="graduationCGPA" value={formData.graduationCGPA} onChange={handleChange} />
              
//               </label>
//             </div>
//             <br />

//             <div className="info-intern" style={{display:'none'}}>
//               {/* HERE */}
//               <div className="intern-header">Current Job</div>
//               <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
//               <br />
              
//                 <div >
//                   <label>
//                     Company Name:
//                     <input
//                       type="text"
//                       name="companyName"
//                       value={formData.Job.companyName}
//                       style={{marginLeft:'25px'}}
//                       onChange={(e) =>
//                         setFormData((prevState) => ({
//                           ...prevState,
//                           Job: { ...prevState.Job, companyName: e.target.value },
//                         }))
//                       }
//                     />
//                   </label>
//                   <label>
//                     From:
//                     <input
//                       type="date"
//                       name="from"
//                       value={formData.Job.from}
//                       style={{marginLeft:'103px'}}
//                       onChange={(e)=>{
//                         setFormData((prevState)=>({
//                           ...prevState,
//                           Job:{...prevState.from, from:e.target.value}
//                         }))
//                       }}
//                     />
//                   </label>
//                   {/* <label>
//                     To:
//                     <input
//                       type="date"
//                       name="to"
//                       value={formData.Job.to}
//                       style={{marginLeft:'122px'}}
//                       onChange={(e)=>{
//                         setFormData((prevState)=>({
//                           ...prevState,
//                           Job:{...prevState.to, to:e.target.value}
//                         }))
//                       }}
//                       // style={{ marginLeft: '20px' }}
//                     />
//                   </label> */}
//                   {/* <button className="save" onClick={() => handleDeleteInternship(index)} style={{width:'90px',height:'40px'}}>Delete Internship</button> */}
//                   <div>
//                     {/* <br /> */}
//                     {/* <br /> */}
//                   </div>
//                 </div>
              
//               {/* <button onClick={handleAddInternship} className="save" style={{width:'90px', height:'40px'}}>Add Internship</button> */}
//             </div>
//             <br />

//             <div className="info-intern">
//               <div className="intern-header">Internships</div>
//               <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
//               <br />
//               {formData.internships.map((internship, index) => (
//                 <div key={index}>
//                   <label>
//                     Company Name:
//                     <input
//                       type="text"
//                       name="companyName"
//                       value={internship.companyName}
//                       style={{marginLeft:'25px'}}
//                       onChange={(e) => handleInternshipChange(index, e)}
//                     />
//                   </label>
//                   <label>
//                     From:
//                     <input
//                       type="date"
//                       name="from"
//                       value={internship.from}
//                       style={{marginLeft:'103px'}}
//                       onChange={(e) => handleInternshipChange(index, e)}
//                     />
//                   </label>
//                   <label>
//                     To:
//                     <input
//                       type="date"
//                       name="to"
//                       value={internship.to}
//                       style={{marginLeft:'122px'}}
//                       onChange={(e) => handleInternshipChange(index, e)}
//                       // style={{ marginLeft: '20px' }}
//                     />
//                   </label>
//                   <button className="save" onClick={() => handleDeleteInternship(index)} style={{width:'90px',height:'40px'}}>Delete Internship</button>
//                   <div>
//                     <br />
//                     <br />
//                   </div>
//                 </div>
//               ))}
//               <button onClick={handleAddInternship} className="save" style={{width:'90px', height:'40px'}}>Add Internship</button>
//             </div>


//           <br />
//           <br />

//           <div className="info-skill">
//             <label>Skills:</label>
//             <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
//             <br />
//             {formData.skills.map((skill, index) => (
//               <div key={index}>
//                 <input
//                   type="text"
//                   value={skill}
//                   style={{marginLeft:'150px'}}
//                   onChange={(e) => handleSkillChange(index, e)}
//                 />
//                 <button
//                   className="save"
//                   onClick={() => handleDeleteSkill(index)} // Add delete functionality
//           style={{ width: '90px', height: '40px', marginLeft: '10px' }}
//                 >
//                   Delete Skill
//                 </button>
//                 <div className='button-spacer'>
//                   <br />
//                 </div>
//             </div>
              
//             ))}
            
//             <button onClick={handleAddSkill} className="save" style={{ width: '90px', height: '40px' }}>
//               Add Skill
//             </button>
//           </div>

        
//         <br />

//             <div className="info-project">
//               <div className="project-header">Projects</div>
//               <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
//               <br />
//               {formData.projects.map((project, index) => (
//     <div key={index}>
//       <label>
//         Project Name:
//         <input
//           type="text"
//           name="name" // Must match the property in the project object
//           value={project.name}
//           style={{marginLeft:'40px'}} 
//           onChange={(e) => handleProjectChange(index, e)}
//         />
//       </label>
//       <label>
//         Skills Used:
//         <input
//           type="text"
//           name="skillUsed" // Must match the property in the project object
//           value={project.skillUsed}
//           style={{marginLeft:'55px'}}
//           onChange={(e) => handleProjectChange(index, e)}
//         />
//       </label>
//       <label>
//         Project Details:
//         <br />
//         <textarea
//           name="details" // Must match the property in the project object
//           value={project.details}
//           onChange={(e) => handleProjectChange(index, e)}
//           rows="4"
//           cols="50"
//           style={{ border: '2px solid black', borderRadius: '10px', marginLeft:'145px' }}
//         />
//           </label>
//           <button
//             className="save"
//             onClick={() => handleDeleteProject(index)}
//             style={{ width: '80px', height: '40px' }}
//           >
//         Delete Project
//           </button>
//           </div>
//         ))}
    
//             <div><br /><br />
//             </div>
//               <button onClick={handleAddProject} className="save" style={{width:'80px', height:'40px'}}>Add Project</button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }



'use client';

import { useParams } from 'next/navigation';
import '../../../styles/Profile.css';
import { useEffect, useState } from 'react';
import axios from 'axios';



export  function CandidateProfilePage() {

  const [preview, setPreview] = useState(null);
  const [buttonText, setButtonText] = useState('Choose File');
  const [tempData, setTempData] = useState({
    name: '',
    dob: '',
    gender: '',
    college: '',
    summary: '',
    tenthCGPA: '',
    twelfthCGPA: '',
    graduationCGPA: '',
    Job: { companyName: '', from: '' },
    internships: [{ companyName: '', from: '', to: '' }],
    skills: [''],
    projects: [{ name: '', skillUsed: '', details: '' }],
  });
  const [merauserData,setmeraUserData]=useState({});

  const params =useParams();
  const userId=params.params[0];

  const fetchuserdata= async ()=>{
    console.log("ID",userId)
    const res=await axios.get(`/api/user/profile/${userId}`)
    console.log(res.data.data);
    merauserData(res.data);
    console.log(merauserData.userType);
  }
useEffect(()=>{
 fetchuserdata();
},[])

 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setButtonText('Edit File');
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setButtonText('Choose File');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobChange = (event) => {
    const { name, value } = event.target;
    setTempData((prev) => ({
      ...prev,
      Job: { ...prev.Job, [name]: value },
    }));
  };

  const handleAddInternship = () => {
    setTempData((prev) => ({
      ...prev,
      internships: [...prev.internships, { companyName: '', from: '', to: '' }],
    }));
  };

  const handleDeleteInternship = (index) => {
    const newInternships = [...tempData.internships];
    newInternships.splice(index, 1);
    setTempData((prev) => ({
      ...prev,
      internships: newInternships,
    }));
  };

  const handleInternshipChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInternships = [...tempData.internships];
    updatedInternships[index] = { ...updatedInternships[index], [name]: value };
    setTempData((prev) => ({
      ...prev,
      internships: updatedInternships,
    }));
  };

  const handleSkillChange = (index, event) => {
    const newSkills = [...tempData.skills];
    newSkills[index] = event.target.value;
    setTempData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const handleAddSkill = () => {
    setTempData((prev) => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  const handleDeleteSkill = (index) => {
    const newSkills = [...tempData.skills];
    newSkills.splice(index, 1);
    setTempData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const handleProjectChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProjects = [...tempData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };
    setTempData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
  };

  const handleAddProject = () => {
    setTempData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: '', skillUsed: '', details: '' }],
    }));
  };

  const handleDeleteProject = (index) => {
    const newProjects = [...tempData.projects];
    newProjects.splice(index, 1);
    setTempData((prev) => ({
      ...prev,
      projects: newProjects,
    }));
  };

  const [resumePreview, setResumePreview] = useState(null);
  const buttonValue = 'Choose File';

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        const fileUrl = URL.createObjectURL(file);
        setResumePreview(fileUrl);
      } else {
        alert('Please upload a valid PDF file.');
      }
    }
  };

  const handleSave = () => {
    // Handle saving the form data (tempData) to a server or local storage
    console.log('Form data saved:', tempData);
  };

  return (
    <>
      <div className="profile-header">Profile</div>

      <div className="profile">
        <div className="photo-section">
          <div className="photo-section-header">Profile Photo</div>
          <div className="image-preview">
            {preview ? <img src={preview} alt="Profile Preview" /> : <span>Preview</span>}
          </div>
          <label htmlFor="fileInput" className="file-label">{buttonText}</label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <br />
          <br />
          <br />
         
          {  merauserData.userType ==='candidate'?(
            <div className="resume-section">
            <div className="resume-section-header" style={{ marginLeft: '50px' }}>Upload Resume</div>
            <br />
            <div className="resume-preview">
              {resumePreview ? (
                <a href={resumePreview} target="_blank" rel="noopener noreferrer" className="resume-link" style={{ marginLeft: '73px', color: 'red', textDecoration: 'underline' }}>
                  View Resume
                </a>
              ) : (
                <span>No Preview Available</span>
              )}
            </div>
            <label htmlFor="resumeInput" className="file-label">
              {buttonValue}
            </label>
            <input
              type="file"
              id="resumeInput"
              accept=".pdf"
              onChange={handleResumeChange}
              style={{ display: 'none' }}
            />
          </div>):(<div> </div>)}

        </div>

        <div className="profile-divide"></div>

        <div className="info-section">
          <div className="info-title">Basic Details</div>
          <div className="info-about">
            <div className="about-header">About</div>
            <hr style={{ backgroundColor: 'black', border: 'none', height: '2px', width: '500px' }} />
            <br />
            <label>
              Name:
              <input type="text" name="name" value={tempData.name} style={{ marginLeft: '85px' }} onChange={handleChange} />
            </label>
            <label>
              Date of Birth:
              <input type="date" name="dob" value={tempData.dob} style={{ marginLeft: '34px' }} onChange={handleChange} />
            </label>
            <label>
              College Name:
              <input type="text" name="college" value={tempData.college} style={{ marginLeft: '25px' }} onChange={handleChange} />
            </label>
          </div>
          <br />
          <div className="info-summary">
            <label>
              <div className="summary-header">Summary</div>
              <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
              <br />
              <textarea name="summary" value={tempData.summary} onChange={handleChange} rows="5" cols="50" style={{ border: '2px solid black', borderRadius: '10px', marginLeft: '130px' }} />
            </label>
          </div>
          <br />

          <div className="info-education">
            <div className="edu-header">Education</div>
            <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
            <label>
              10th CGPA:
              <input type="number" name="tenthCGPA" value={tempData.tenthCGPA} style={{ marginLeft: '58px' }} onChange={handleChange} />
            </label>
            <label>
              12th CGPA:
              <input type="number" name="twelfthCGPA" value={tempData.twelfthCGPA} style={{ marginLeft: '58px' }} onChange={handleChange} />
            </label>
            <label>
              Graduation CGPA:
              <input type="number" name="graduationCGPA" value={tempData.graduationCGPA} onChange={handleChange} />
            </label>
          </div>
          <br />

          <div className="info-intern">
            <div className="intern-header" >Job</div>
            <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
            <br />
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={tempData.Job.companyName}
                style={{ marginLeft: '25px' }}
                onChange={handleJobChange}
              />
            </label>
            <label>
              From:
              <input
                type="date"
                name="from"
                value={tempData.Job.from}
                style={{ marginLeft: '103px' }}
                onChange={handleJobChange}
              />
            </label>
            <label>
              To:
              <input
                type="date"
                name="to"
                value={tempData.Job.to}
                style={{ marginLeft: '122px' }}
                onChange={handleJobChange}
              />
            </label>
          </div>

          <br />
          <div className="info-intern">
            <div className="intern-header">Internships</div>
            <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
            <br />
            {tempData.internships.map((internship, index) => (
              <div key={index}>
                <label>
                  Company Name:
                  <input
                    type="text"
                    name="companyName"
                    value={internship.companyName}
                    style={{ marginLeft: '25px' }}
                    onChange={(e) => handleInternshipChange(index, e)}
                  />
                </label>
                <label>
                  From:
                  <input
                    type="date"
                    name="from"
                    value={internship.from}
                    style={{ marginLeft: '103px' }}
                    onChange={(e) => handleInternshipChange(index, e)}
                  />
                </label>
              
                <button className="save" onClick={() => handleDeleteInternship(index)} style={{ width: '90px', height: '40px' }}>Delete Internship</button>
                <div><br /><br /></div>
              </div>
            ))}
            <button onClick={handleAddInternship} className="save" style={{ width: '90px', height: '40px' }}>Add Internship</button>
          </div>

          <br />
          <div className="info-skill">
            <label>Skills:</label>
            <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
            <br />
            {tempData.skills.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={skill}
                  style={{ marginLeft: '150px' }}
                  onChange={(e) => handleSkillChange(index, e)}
                />
                <button
                  className="save"
                  onClick={() => handleDeleteSkill(index)} // Add delete functionality
                  style={{ width: '90px', height: '40px', marginLeft: '10px' }}
                >
                  Delete Skill
                </button>
                <div className="button-spacer"><br /></div>
              </div>
            ))}
            <button onClick={handleAddSkill} className="save" style={{ width: '90px', height: '40px' }}>
              Add Skill
            </button>
          </div>

          <br />
          <br />

          <div className="info-project">
            <div className="project-header">Projects</div>
            <hr style={{ backgroundColor: 'black', border: 'none', height: '2.5px', width: '500px' }} />
            <br />
            {tempData.projects.map((project, index) => (
              <div key={index}>
                <label>
                  Project Name:
                  <input
                    type="text"
                    name="name"
                    value={project.name}
                    style={{ marginLeft: '40px' }}
                    onChange={(e) => handleProjectChange(index, e)}
                  />
                </label>
                <label>
                  Skills Used:
                  <input
                    type="text"
                    name="skillUsed"
                    value={project.skillUsed}
                    style={{ marginLeft: '55px' }}
                    onChange={(e) => handleProjectChange(index, e)}
                  />
                </label>
                <label>
                  Project Details:
                  <br />
                  <textarea
                    name="details"
                    value={project.details}
                    onChange={(e) => handleProjectChange(index, e)}
                    rows="4"
                    cols="50"
                    style={{ border: '2px solid black', borderRadius: '10px', marginLeft: '145px' }}
                  />
                </label>
                <button
                  className="save"
                  onClick={() => handleDeleteProject(index)}
                  style={{ width: '80px', height: '40px' }}
                >
                  Delete Project
                </button>
              </div>
            ))}
            <div><br /><br /></div>
            <button onClick={handleAddProject} className="save" style={{ width: '80px', height: '40px' }}>Add Project</button>
          </div>

          <br />

<br />
          <button onClick={handleSave} className="save" style={{marginRight:'470px'}}>Save</button>
        </div>
      </div>
    </>
  );
}
