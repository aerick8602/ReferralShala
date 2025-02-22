"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { HashLoader } from "react-spinners";
import "../../../styles/Dashboard.css";
import axios from "axios";
import { useParams } from "next/navigation";
import ReferralWrapper from "../../../components/wrappers/ReferralWrapper";

const dummyReferrals = [
  {
    referralId: 1,
    companyName: "Google",
    jobCategory: "Software Engineering",
    jobTitle: "Frontend Developer",
    jobDescription: "Develop UI components with React.js",
    jobLink: "https://careers.google.com/jobs/",
    location: "San Francisco, CA",
    experienceRequired: 2,
  },
  {
    referralId: 2,
    companyName: "Microsoft",
    jobCategory: "Backend Engineering",
    jobTitle: "Node.js Developer",
    jobDescription: "Build scalable APIs with Express.js",
    jobLink: "https://careers.microsoft.com/",
    location: "Seattle, WA",
    experienceRequired: 3,
  },
  {
    referralId: 3,
    companyName: "Amazon",
    jobCategory: "Cloud Engineering",
    jobTitle: "AWS Solutions Architect",
    jobDescription: "Design and implement AWS cloud solutions",
    jobLink: "https://www.amazon.jobs/",
    location: "New York, NY",
    experienceRequired: 5,
  },
  {
    referralId: 4,
    companyName: "Meta",
    jobCategory: "Machine Learning",
    jobTitle: "AI Research Engineer",
    jobDescription: "Develop cutting-edge ML models for social media",
    jobLink: "https://www.metacareers.com/jobs/",
    location: "Menlo Park, CA",
    experienceRequired: 4,
  },
  {
    referralId: 5,
    companyName: "Netflix",
    jobCategory: "Data Science",
    jobTitle: "Data Scientist",
    jobDescription: "Analyze user behavior and optimize recommendations",
    jobLink: "https://jobs.netflix.com/",
    location: "Los Angeles, CA",
    experienceRequired: 3,
  },
  {
    referralId: 6,
    companyName: "Tesla",
    jobCategory: "Embedded Systems",
    jobTitle: "Firmware Engineer",
    jobDescription: "Develop software for electric vehicles",
    jobLink: "https://www.tesla.com/careers",
    location: "Austin, TX",
    experienceRequired: 3,
  },
  {
    referralId: 7,
    companyName: "Google",
    jobCategory: "Software Engineering",
    jobTitle: "Frontend Developer",
    jobDescription: "Develop UI components with React.js",
    jobLink: "https://careers.google.com/jobs/",
    location: "San Francisco, CA",
    experienceRequired: 2,
  },
  {
    referralId: 8,
    companyName: "Microsoft",
    jobCategory: "Backend Engineering",
    jobTitle: "Node.js Developer",
    jobDescription: "Build scalable APIs with Express.js",
    jobLink: "https://careers.microsoft.com/",
    location: "Seattle, WA",
    experienceRequired: 3,
  },
  {
    referralId: 9,
    companyName: "Amazon",
    jobCategory: "Cloud Engineering",
    jobTitle: "AWS Solutions Architect",
    jobDescription: "Design and implement AWS cloud solutions",
    jobLink: "https://www.amazon.jobs/",
    location: "New York, NY",
    experienceRequired: 5,
  },
  {
    referralId: 10,
    companyName: "Meta",
    jobCategory: "Machine Learning",
    jobTitle: "AI Research Engineer",
    jobDescription: "Develop cutting-edge ML models for social media",
    jobLink: "https://www.metacareers.com/jobs/",
    location: "Menlo Park, CA",
    experienceRequired: 4,
  },
];
export default function DashboardPage() {
  const params = useParams();
  const userId = params.params;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    experience: "",
    city: "",
    company: "",
    keywords: "",
    jobCategory: "",
    jobRoles: [],
  });

  const filteredReferrals = dummyReferrals.filter((referral) => {
    const keyword = filters.keywords?.toLowerCase() || "";

    return (
      (!filters.experience ||
        referral.experienceRequired >= parseInt(filters.experience)) &&
      (!filters.city ||
        referral.location.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.company ||
        referral.companyName
          .toLowerCase()
          .includes(filters.company.toLowerCase())) &&
      (!filters.keywords ||
        referral.jobTitle.toLowerCase().includes(keyword) ||
        referral.companyName.toLowerCase().includes(keyword) ||
        referral.jobCategory.toLowerCase().includes(keyword) ||
        referral.location.toLowerCase().includes(keyword) ||
        referral.jobDescription.toLowerCase().includes(keyword)) &&
      (filters.jobRoles.length === 0 ||
        filters.jobRoles.includes(referral.jobCategory))
    );
  });

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`/api/user/${user.id}`);
        setUserData(response.data.data);
        console.log("Fetched user data:", response.data.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [user]);

  if (!isLoaded || !isSignedIn || loading) {
    return (
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Navbar
        userId={userData.userId}
        userType={userData.userType}
        clerkID={user?.id.replace("user_", "")}
      />

      <div className="dashboard">
        {/* Filter Section */}
        <div className="filter">
          <h3 className="filter-title">
            <i className="pi pi-filter"></i> &nbsp;&nbsp;&nbsp;Referrals by
          </h3>

          {/* Experience Filter */}
          <select
            className="filter-select"
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
          >
            <option value="">Fresher</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="3">4 Years</option>
            <option value="3">5+ Years</option>
          </select>

          {/* City Name Input */}
          <input
            type="text"
            className="filter-input"
            placeholder="City name..."
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          />

          {/* Company Name Input */}
          <input
            type="text"
            className="filter-input"
            placeholder="Company name..."
            value={filters.company}
            onChange={(e) =>
              setFilters({ ...filters, company: e.target.value })
            }
          />

          {/* Keywords Search */}
          <input
            type="text"
            className="filter-input"
            placeholder="Keywords..."
            value={filters.keywords}
            onChange={(e) =>
              setFilters({ ...filters, keywords: e.target.value })
            }
          />

          {/* Job Role Filters */}
          <h4 className="filter-subtitle">Job Role</h4>
          <div className="checkbox-group">
            {[
              "Frontend Developer",
              "Embedded Systems Engineer",
              "Cloud Engineer",
              "Product Manager",
              "AI Engineer",
            ].map((role) => (
              <label key={role} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.jobRoles.includes(role)}
                  onChange={(e) => {
                    const newRoles = e.target.checked
                      ? [...filters.jobRoles, role]
                      : filters.jobRoles.filter((r) => r !== role);
                    setFilters({ ...filters, jobRoles: newRoles });
                  }}
                />
                {role}
              </label>
            ))}
          </div>

          {/* Apply Filters Button */}
          <button className="filter-button">Filter Jobs</button>
        </div>

        {/* Referral List Section */}
        <div className="referral-wrapper">
          <h1 className="referrals-header" style={{ marginLeft: "-100px" }}>
            Job Referrals
          </h1>
          <ReferralWrapper dummyReferrals={filteredReferrals} />
        </div>
      </div>

      <Footer userId={userData.userId} userType={userData.userType} />
    </>
  );
}
