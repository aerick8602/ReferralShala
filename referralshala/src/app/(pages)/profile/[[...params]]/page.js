'use client';
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/Profile.css"
import Education from "../../../components/Education"
import Experience from "../../../components/Experience"
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
    // bas is userid ka use karke sare data se khelenge


    const fetchuserData=async()=> {}
    // 
    const fetchEducationData=async()=> {}
    // 
    const fetchExperienceData=async()=> {}
    // 
    const fetchCandidateData=async()=> {}
    // 
    const fetchEmployerData=async()=> {}
    //
    const updateuserData=async()=>{}
    //
    const addEducationData=async()=>{}
    //
    const deleteEducationData=async()=>{}
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
        <Navbar/>
        <div className="profile">
            
            <div className="personal-data">
                {/* profile image,firstname,lastname,email,phone-number,DOB,location,social-link*/}
            </div>
            <div className="main-profile">
                {/* Resume OR job-role,summary OR company-name,skills OR description,education,experience */}

                {educationData?.map((edu)=>{
                    return <Education data={edu}></Education>
                })}
                {experienceData?.map((exp)=>{
                    return <Experience data={exp}></Experience>
                })}
            </div>
        </div>
        </>
    )
}