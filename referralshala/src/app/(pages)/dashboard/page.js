'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { HashLoader } from "react-spinners";

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true); // New state for controlling user data loading

  const fetchUserData = async () => {
    if (!user?.id) return; // Ensure `user.id` is defined
    try {
      const response = await axios.get(`/api/user/${user.id}`);
      console.log(response.data.data);
      setUserData(response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
    } finally {
      setIsDataLoading(false); // Set loading to false after fetching user data
    }
  };

  const updateUserType = async () => {
    if (!selectedType) return; // Prevent unnecessary API call
    try {
      setLoading(true);
      await axios.put(`/api/user/${user.id}`, {
        userType: selectedType,
      });
      setUserData((prev) => ({ ...prev, userType: selectedType }));
    } catch (err) {
      console.error("Error updating user type:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]); // Run only when `user` changes

  if (!isLoaded || !isSignedIn || isDataLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <HashLoader size={50} color="#8A2BE2" />
      </div>
    );
  }

  if (userData?.userType === "guest" || !userData?.userType) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Choose Your Role</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedType("candidate")}
            className={`px-6 py-2 ${
              selectedType === "candidate" ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded`}
          >
            Candidate
          </button>
          <button
            onClick={() => setSelectedType("employer")}
            className={`px-6 py-2 ${
              selectedType === "employer" ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded`}
          >
            Employer
          </button>
        </div>
        <button
          onClick={updateUserType}
          className={`mt-6 px-8 py-2 bg-green-500 text-white rounded ${
            !selectedType || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedType || loading}
        >
          {loading ? "Updating..." : "Confirm"}
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl">
          Hello {user?.firstName || "User"}. Here's your Dashboard. You are a {userData.userType}.
        </p>
      </div>
    </>
  );
}
