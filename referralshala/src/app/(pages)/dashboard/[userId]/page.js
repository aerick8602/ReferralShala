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

export default function DashboardPage() {
  const params = useParams();
  const userId = params.params;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true); // Use lowercase for consistency

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.id) return; // Ensure user is available before making API call

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
  }, [user]); // Depend on user so it re-runs when user changes

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
      <h1 className="referrals-header">Job Referrals</h1>
      <div className="dashbaord">
        <div className="filter">To be Done</div>
        <ReferralWrapper />
      </div>

      <br />
      <br />
      <Footer userId={userData.userId} userType={userData.userType} />
    </>
  );
}
