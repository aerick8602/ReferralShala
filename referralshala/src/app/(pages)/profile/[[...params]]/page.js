'use client';
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/Profile.css"
import Education from "../../../components/Education"
import Experience from "../../../components/Experience"
import ExperienceCard from "../../../components/ExperienceCard"
import EducationCard from "../../../components/EducationCard"
import { useParams } from "next/navigation";




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
          const skills=["c++"]
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
    
    return (
        <>
        {/* <Navbar/> */}
        <ExperienceCard></ExperienceCard>
        <EducationCard></EducationCard>
        
        </>
    )
}