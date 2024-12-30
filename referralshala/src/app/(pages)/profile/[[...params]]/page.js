'use client';

import { useParams } from "next/navigation";
import CandidateProfile from "./candidateprofile";
import EmployerProfile from "./employerprofile";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners"; 

export default function ProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const params = useParams();
  const userType = params.params[0];
  const userId = params.params[1];

  const [isauth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`/api/user/${user?.id}`);
      setUserData(response.data.data); 
    } catch (err) {
      console.log("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn && user?.id) {
      fetchUserId();
    } else {
      setLoading(false);
    }
  }, [isSignedIn, user?.id]);

  useEffect(() => {
    if (userData) {
      if (userData.userId === userId) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }
  }, [userData, userId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      {userType === "candidate" ? (
        <CandidateProfile userId={userId} isauth={isauth} />
      ) : (
        <EmployerProfile userId={userId} isauth={isauth} />
      )}
    </>
  );
}
