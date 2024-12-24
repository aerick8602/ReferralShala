'use client';
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/Profile.css"
import Education from "../../../components/Education"
import Experience from "../../../components/Experience"
import ExperienceCard from "../../../components/cards/ExperienceCard"
import EducationCard from "../../../components/cards/EducationCard"
import PersonalCard from "../../../components/cards/PersonalCard"
import ReferralCard from "../../../components/cards/ReferralCard"
import { useParams } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import EducationWrapper from "../../../components/Education";
import ExperienceWrapper from "../../../components/Experience";




export default function ProfilePage(){
    const [educationData,setEducation]=useState([]);
    const [experienceData,setExperience]=useState([]);
    const [userData,setUserData]=useState({});
    const [candidateData,setCandiateData]=useState({});
    const [employerData,setEmployerData]=useState({});
    const [loading,setloading]=useState(true);


    const params=useParams();
    const userId=params.params[0];
//   console.log(userId);



    // fetching user data


    const fetchuserData = async () => {
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
            console.log(data); 
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    
    // fetching user education


    const fetchEducationData=async()=> {
        try {
            const res=await fetch(`/api/user/profile/${userId}/education`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!res.ok) {
                throw new Error(`HTTP error! in fetchEducation status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data); 
        } catch (error) {
            console.log("error fetching education data",error);
        }
    }


    // fetching user experience


    const fetchExperienceData=async()=> {
            try {
                const res=await fetch(`/api/user/profile/${userId}/experience`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if (!res.ok) {
                    throw new Error(`HTTP error! in fetchexp status: ${res.status}`);
                }
                const data = await res.json();
                console.log("exp fetched",data); 
            } catch (error) {
                console.log("error fetching exp data",error);
            }
    }


    // fetching candidate data


    const fetchCandidateData=async()=> {
        try {
            const res=await fetch(`/api/user/profile/${userId}/candidate`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!res.ok) {
                throw new Error(`HTTP error! in candidate status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data); 
        } catch (error) {
            console.log("error fetching candidate data",error);
        }
    }


    // fetching employer data


    const fetchEmployerData=async()=> {
        try {
            const res=await fetch(`/api/user/profile/${userId}/employer`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!res.ok) {
                throw new Error(`HTTP error! in employer status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data); 
        } catch (error) {
            console.log("error fetching employer data",error);
        }
    }


    // UPDATE USER DATA


    const updateuserData=async(skills, resume)=>{
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
          const skills={ "primary": "Java,c++", "secondary": "Node.js,express.js" }
          const resume="done done doneee"
          updateuserData(skills,resume);


    //


    const addEducationData=async()=>{}


    // DELETE EDUCATION 


    const deleteEducationData=async(Eid)=>{
        try{
            const response= await fetch(`/api/user/profile/${userId}/education/${Eid}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
            }
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
        // deleteEducationData(3);
    //
    const updateEducationData=async()=>{}
    //
    const addExperienceData=async()=>{}
    //
    const deleteExperienceData=async()=>{}
    //
    const updateExperienceData=async()=>{}






    // yaha se niche ka me karuga 
    useEffect(()=>{fetchuserData()},[userData]);
    useEffect(()=>{fetchEducationData()},[educationData]);
    useEffect(()=>{fetchExperienceData()},[experienceData]);
    useEffect(()=>{fetchCandidateData()},[candidateData]);
    useEffect(()=>{fetchEmployerData()},[employerData]);

    const [isPersonalCardOpen, setPersonalCardOpen] = useState(false);
    const [isExperienceCardOpen, setExperienceCardOpen] = useState(false);
    const [isEducationCardOpen, setEducationCardOpen] = useState(false);

    const toggleCard = (cardType) => {
        if (cardType === 'personal') {
            setPersonalCardOpen(!isPersonalCardOpen);
        } else if (cardType === 'experience') {
            setExperienceCardOpen(!isExperienceCardOpen);
        } else if (cardType === 'education') {
            setEducationCardOpen(!isEducationCardOpen);
        }
    };

    const educatioonData = [
        {
          educationId: 1,
          userId: 123,
          instituteName: "National Institute of Technology",
          degree: "Bachelor's",
          stream: "Electrical Engineering",
          startYear: 2020,
          endYear: 2024,
          isCurrentlyEducating: true,
          grade: { type: "CGPA", value: "9.5" },
          createdAt: "2020-09-01T00:00:00Z",
        },
        {
          educationId: 2,
          userId: 123,
          instituteName: "ABC High School",
          degree: "High School Diploma",
          stream: "Science",
          startYear: 2018,
          endYear: 2020,
          isCurrentlyEducating: false,
          grade: { type: "Percentage", value: "90%" },
          createdAt: "2018-06-01T00:00:00Z",
        },
      ];

      const experienceeData = [
        {
          experienceId: 1,
          userId: 123,
          companyName: "Tech Solutions Inc.",
          role: "Software Engineer",
          location: "New York, USA",
          startYear: 2022,
          endYear: null,
          isCurrentlyEmployed: true,
          description: "Worked on building scalable web applications and APIs.",
          createdAt: "2022-01-01T00:00:00Z",
        },
        {
          experienceId: 2,
          userId: 123,
          companyName: "Innovatech Pvt. Ltd.",
          role: "Intern",
          location: "San Francisco, USA",
          startYear: 2020,
          endYear: 2021,
          isCurrentlyEmployed: false,
          description: "Developed tools for data analysis and process automation.",
          createdAt: "2020-06-01T00:00:00Z",
        },
      ];
      
      
    
    return (
        <>
        <Navbar />
        <div className="profile">
            <div className="personal-data">
                <div className="avatar">
                    <img src="/path-to-avatar.jpg" alt="Profile" className="avatar-img" />
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
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">GitHub</a></li>
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

        {isPersonalCardOpen && <PersonalCard onClose={() => toggleCard('personal')} />}
        {isExperienceCardOpen && <ExperienceCard onClose={() => toggleCard('experience')} />}
        {isEducationCardOpen && <EducationCard onClose={() => toggleCard('education')} />}
    </>
    )
}