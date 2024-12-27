'use client';
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/Profile.css";
import { FaPencilAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import EducationWrapper from "../../../components/Education";
import ExperienceWrapper from "../../../components/Experience";
import PersonalCard from "../../../components/cards/PersonalCard"

export default function CandidateProfile({userId}) {

    const [userData, setUserData] = useState({});
    const [candidateData, setCandidateData] = useState({});
    const [educationData, setEducationData] = useState([]);
    const [experienceData, setExperienceData] = useState([]);

    const fetchUserData = async () => {
        try {
            const res = await fetch(`/api/user/profile/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            
            // Log the response data
            console.log("User Data Response:", data);
    
            setUserData(data.data);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };
    
    const fetchCandidateData = async () => {
        try {
            const res = await fetch(`/api/user/profile/${userId}/candidate`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! in candidate status: ${res.status}`);
            }
            const data = await res.json();
            
            // Log the response data
            console.log("Candidate Data Response:", data);
    
            setCandidateData(data.data);
        } catch (error) {
            console.log("Error fetching candidate data", error);
        }
    };
    
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
            
            // Log the response data
            console.log("Education Data Response:", data);
    
            setEducationData(data.data);
        } catch (error) {
            console.log("Error fetching education data", error);
        }
    };
    
    const fetchExperienceData = async () => {
        try {
            const res = await fetch(`/api/user/profile/${userId}/experience`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! in fetchExperience status: ${res.status}`);
            }
            const data = await res.json();
            
            // Log the response data
            console.log("Experience Data Response:", data);
    
            setExperienceData(data.data);
        } catch (error) {
            console.log("Error fetching experience data", error);
        }
    };

    const updateuser=async(firstname,lastname,imageurl)=>{
        try{
            const response= await fetch(`/api/user/profile/${userId}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({firstname,lastname,imageurl})
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
          console.log("post education successful:", data);
          return data; 
        }
        catch(error){
            console.log("Error post education candidate:", error);
            return null;
        }
    }

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
          console.log("Update EDUCATION successful:", data);
          return data; 
        }
        catch(error){
            console.log("Error updating candidate:", error);
            return null;
        }
    }


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

    

    useEffect(() => {
        if (userId) {
            fetchUserData();
            fetchCandidateData();
            fetchEducationData();
            fetchExperienceData();
            updateuser("aditya","sawner","update he ji");
            addEducationData("IITB", "btech", "Cse",2021, 2025, true, 10)
            const instituteName="oxford"
            // updateEducationData(instituteName)
            deleteExperienceData(11);
        }
    }, [userId]);   

    return (
        <>
            <Navbar userId={userId} />
            <div className="profile">
                <div className="personal-data">
                    <PersonalCard></PersonalCard>
                    <div className="avatar">
                        <img src={userData?.profileImage || "/path-to-avatar.jpg"} alt="Profile" className="avatar-img" />
                    </div>
                    <div className="details">
                        <div className="info-item">
                            <FaEnvelope />
                            <p>{userData?.emailAddress || "Email not available"}</p>
                        </div>
                        <div className="info-item">
                            <FaPhone />
                            <p>{candidateData?.contactNumber || "Phone not available"}</p>
                        </div>
                        <div className="info-item">
                            <FaMapMarkerAlt />
                            <p>{candidateData?.location || "Location not available"}</p>
                        </div>
                        <div className="social-links">
                            <p>Social Links:</p>
                            <ul>
                                {candidateData?.socialLinks?.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.link.startsWith("https://") ? link.link : `https://${link.link}`} target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt /> {link.platform}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="main-profile">
                    <div className="education-section">
                        {educationData.length > 0 ? (
                            <div>
                                <label>Education Details</label>
                                <EducationWrapper education={educationData} />
                            </div>
                        ) : (
                            <p>No education data available.</p>
                        )}

                        {experienceData.length > 0 ? (
                              <div>
                              <label>Education Details</label>
                              <ExperienceWrapper experiences={experienceData} />
                          </div>
                        ) : (
                            <p>No experience data available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
