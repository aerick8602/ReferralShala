"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { HashLoader } from "react-spinners";
import "../../../styles/dashboard.css";
import axios from "axios";
import { useParams } from "next/navigation";

export default function MyReferrals() {
  const params = useParams();
  const userId = params.params;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

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
      <div className="dashboard-container">
        <p className="dashboard-text">
          Hello {user?.firstName || "User"}. Here's your Referrals.
        </p>
      </div>
      <Footer userId={userData.userId} userType={userData.userType} />
    </>
  );
}
