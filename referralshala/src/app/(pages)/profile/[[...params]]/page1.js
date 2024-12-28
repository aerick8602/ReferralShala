"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/Profile.css";
import ExperienceModel from "../../../components/models/ExperienceModel";
import EducationModel from "../../../components/models/EducationModel";
import PersonalCard from "../../../components/models/PersonalModel";
import ReferralCard from "../../../components/models/ReferralModel";
import { useParams } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";
import axios from "axios";

export default function ProfilePage() {
  const [educationData, setEducation] = useState([]);
  const [experienceData, setExperience] = useState([]);
  const [userData, setUserData] = useState({});
  const [candidateData, setCandiateData] = useState({});
  const [employerData, setEmployerData] = useState({});
  const [loading, setloading] = useState(true);

  const params = useParams();
  const userId = params.params[0];

  // fetching user education
  const fetchEducationData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/education`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! in fetchEducation status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("error fetching education data", error);
    }
  };

  // fetching user experience
  const fetchExperienceData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/experience`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! in fetchexp status: ${res.status}`);
      }
      const data = await res.json();
      console.log("exp fetched", data);
    } catch (error) {
      console.log("error fetching exp data", error);
    }
  };

  // fetching candidate data

  // fetching employer data

  const fetchEmployerData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/employer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! in employer status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("error fetching employer data", error);
    }
  };

  // UPDATE USER DATA

  const updateuserData = async (skills, resume) => {
    try {
      const requestBody = {
        ...(skills !== undefined && { skills }),
        ...(resume !== undefined && { resume }),
      };

      const response = await fetch(`/api/user/profile/${userId}/candidate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      return data;
    } catch (error) {
      console.error("Error updating candidate:", error);
      return null;
    }
  };
  const skills = ["lol"];
  const resume = "done done doneee";
  updateuserData(skills, resume);


    //


    const addEducationData=async(instituteName, degree, stream, startYear, endYear, isCurrentlyEducating, grade)=>{
        try{
            const response= await fetch(`/api/user/profile/${userId}/education`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({instituteName, degree, stream, startYear, endYear, isCurrentlyEducating, grade})
        });

           if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Update successful:", data);
          return data; 
        }
        catch(error){
            console.error("Error updating candidate:", error);
            return null;
        }
    }


  // DELETE EDUCATION

  const deleteEducationData = async (Eid) => {
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/education/${Eid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

           if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Update successful:", data);
          return data; 
        }
        catch(error){
            console.log("Error updating candidate:", error);
            return null;
        }
    }


    //


    const updateEducationData=async(instituteName, degree, stream, startYear, endYear, isCurrentlyEducating, grade)=>{
        try{
            const response= await fetch(`/api/user/profile/${userId}/education/${Eid}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({instituteName, degree, stream, startYear, endYear, isCurrentlyEducating, grade})
        });

           if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Update successful:", data);
          return data; 
        }
        catch(error){
            console.log("Error updating candidate:", error);
            return null;
        }
    }


    //


    const addExperienceData=async(companyname,role, location, startyear,endyear,currentlyemployed,description )=>{
        try {
            const response= await fetch(`/api/user/profile/${userId}/experience`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({companyname,role, location, startyear,endyear,currentlyemployed,description })
            });
    
               if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.json();
              console.log("add experiencesssssssssssssssss successful:", data);
              return data;
        } catch (error) {
            console.log("error adding exp",error)
        }
    }


    //

    
    const deleteExperienceData=async(Eid)=>{
        try{
            const response= await fetch(`/api/user/profile/${userId}/experience/${Eid}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
            }
        });

           if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("delete successful: deleteeeeeeeeeeeeee", data);
          return data; 
        }
        catch(error){
            console.log("Error deleting candidate:", error);
            return null;
        }
    }
    

    //


 
    const updateExperienceData = async (Eid, updateFields) => {
        try {
          const response = await fetch(`/api/user/profile/${userId}/experience/${Eid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateFields), // Dynamically pass only fields to update
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Update EXP successful: yeahhhhhhhhhhhhhhhhhhhhhhhhhhh", data);
          return data;
        } catch (error) {
          console.log("Error updating EXP", error);
          return null;
        }
      };
      


    //


    const updateuser=async(firstname,lastname)=>{
        try{
            const response= await fetch(`/api/user/profile/${userId}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({firstname,lastname})
        });

           if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Update successful:", data);
          return data; 
        }
        catch(error){
            console.log("Error updating candidate:", error);
            return null;
        }
    }
  
    //

    const updateEmployer=async()=>{
        try{
            const response= await fetch(`/api/user/profile/${userId}/employer`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({companyName, jobRole,location})
        });

           if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Update successful:", data);
          return data; 
        }
        catch(error){
            console.log("Error updating candidate:", error);
            return null;
        }
    }



  // yaha se niche ka me karuga
  useEffect(() => {
    fetchuserData();
  }, []);
  useEffect(() => {
    fetchEducationData();
  }, [educationData]);
  useEffect(() => {
    fetchExperienceData();
  }, [experienceData]);
  useEffect(() => {
    fetchCandidateData();
  }, [candidateData]);
  useEffect(() => {
    fetchEmployerData();
  }, [employerData]);

  useEffect(() => {}, [userData]);

  const [isPersonalCardOpen, setPersonalCardOpen] = useState(false);
  const [isExperienceCardOpen, setExperienceCardOpen] = useState(false);
  const [isEducationCardOpen, setEducationCardOpen] = useState(false);

  const toggleCard = (cardType) => {
    if (cardType === "personal") {
      setPersonalCardOpen(!isPersonalCardOpen);
    } else if (cardType === "experience") {
      setExperienceCardOpen(!isExperienceCardOpen);
    } else if (cardType === "education") {
      setEducationCardOpen(!isEducationCardOpen);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="personal-data">
          <div className="avatar">
            <img
              src="/path-to-avatar.jpg"
              alt="Profile"
              className="avatar-img"
            />
            {/* <button className="edit-btn" onClick={() => toggleCard('personal')}>
                        <FaPencilAlt />
                    </button> */}
          </div>
          <div className="details">
            <p>{userData?.emailAddress}</p>
            <p>{}</p>
            <p>{userData?.location}</p>
            <p>location</p>
            <p>Social Links:</p>
            <ul>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-profile">
          <EducationWrapper education={educatioonData} />
          <ExperienceWrapper experiences={experienceeData} />

          {/* <div className="section">
                    <h2>Resume</h2>
                    <button className="upload-btn">Upload Resume</button>
                </div>
                <div className="section">
                    <h2>Skills</h2>
                    <ul>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Node.js</li>
                    </ul>
                </div>
                <div className="section">
                    <h2>Education</h2>
                    <button className="edit-btn" onClick={() => toggleCard('education')}>
                        <FaPencilAlt />
                    </button>

                </div>
                <div className="section">
                    <h2>Experience</h2>
                    <button className="edit-btn" onClick={() => toggleCard('experience')}>
                        <FaPencilAlt />
                    </button>

                </div> */}
        </div>
      </div>

      {isPersonalCardOpen && (
        <PersonalCard onClose={() => toggleCard("personal")} />
      )}
      {isExperienceCardOpen && (
        <ExperienceModel onClose={() => toggleCard("experience")} />
      )}
      {isEducationCardOpen && (
        <EducationModel onClose={() => toggleCard("education")} />
      )}
    </>
  );
}
