"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/Profile.css";
import { useParams } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import EducationWrapper from "../../../components/wrappers/EducationWrapper";
import ExperienceWrapper from "../../../components/wrappers/ExperienceWrapper";

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

export default function EmployerProfile() {
  const params = useParams();
  const userId = params.params[0];

  const [userData, setUserData] = useState({});
  const [candidateData, setCandidateData] = useState({});
  const [educationData, setEducation] = useState([]);
  const [experienceData, setExperience] = useState([]);
  const [employerData, setEmployerData] = useState({});

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
      console.log("USER DATA :", data.data);
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
      setCandidateData("CANDIDATE DATA :", data.data);
      console.log(data.data);
    } catch (error) {
      console.log("error fetching candidate data", error);
    }
  };

  useEffect(() => {
    fetchuserData();
    fetchCandidateData();
  }, [userId]);

  return (
    <>
      <Navbar userId={userId} />
      <div className="profile">
        <div className="personal-data">
          <div className="avatar">
            <img
              src={userData?.profileImage || "/path-to-avatar.jpg"}
              alt="Profile"
              className="avatar-img"
            />
          </div>
          <div className="details">
            <p>xyzabc@gmail.com</p>
            <p>Ayush katiyar</p>
            <p>Bhopal</p>
            <div>
              <p>Social Links:</p>
              <ul>
                {candidateData?.socialLinks?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="main-profile">
          <div className="education-section">
            <label className="education-label">Education Details</label>
            <EducationWrapper education={educatioonData} />
          </div>
        </div>
      </div>
    </>
  );
}
