"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { HashLoader } from "react-spinners";
import "../../../styles/Referral.css";
import axios from "axios";
import { useParams } from "next/navigation";
import ReferralWrapper from "../../../components/wrappers/ReferralWrapper";

export default function DashboardPage() {
  const params = useParams();
  const userId = params.userId;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);

  const [filters, setFilters] = useState({
    experience: "",
    city: "",
    company: "",
    keywords: "",
    jobCategory: "",
    jobRoles: [],
  });

  const fetchUserId = async () => {
    if (!user?.id) return;
    try {
      const response = await axios.get(`/api/user/${user?.id}`);
      setUserData(response.data.data);
      console.log("Fetched user data:", response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchReferrals = async () => {
    try {
      const res = await fetch(`/api/referral`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log("referral data", data.data);
      setReferrals(data.data);

      return data.data;
    } catch (error) {
      console.error("Error fetching referrals data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const filteredReferrals = referrals.filter((referral) => {
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
    fetchUserId();
    fetchReferrals();
  }, []);

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
          <div className="filter-title">
            <i className="pi pi-filter-slash"></i> &nbsp;&nbsp;&nbsp;Referrals
            by
          </div>

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
          <h4 className="filter-subtitle">&nbsp;&nbsp;Job Role</h4>
          <div className="checkbox-group">
            {[
              "Embedded Systems Engineer",
              "Product Manager",
              "AI Engineer",
              "Data Scientist",
              "Cloud Engineer",
              "UI/UX Designer",
              "DevOps Engineer",
              "Cybersecurity Analyst",
              "QA Engineer",
              "SEO Specialist",
              "Blockchain Developer",
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

          {/* <button className="filter-button">Filter Jobs</button> */}
        </div>

        {/* Referral List Section */}
        <div className="referral-wrapper">
          <h1 className="referrals-header" style={{ marginLeft: "-100px" }}>
            Job Referrals
          </h1>
          <p
            style={{
              marginLeft: "380px",
              marginTop: "-35px",
              fontSize: "12px",
            }}
          >
            Unlock Exciting Career Opportunities with Fresh Job Referrals ✨
          </p>
          <ReferralWrapper
            dummyReferrals={filteredReferrals}
            candidateUserId={userId}
          />
        </div>
      </div>

      <Footer userId={userData.userId} userType={userData.userType} />
    </>
  );
}
