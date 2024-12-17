'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from 'axios'; 
import Navbar from '../.././components/Navbar'; 
import { HashLoader } from "react-spinners";

export default function ProfilePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${user.id}`);
      setUserData(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserData();
    }
  }, [user]); 

  if (!isLoaded || !isSignedIn) {
    return <div className="flex flex-col justify-center items-center min-h-screen"><HashLoader size={50} color="#8A2BE2" /></div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl">Hello {user.fullName}. Here's your Profile</p>
      </div>
    </>
  );
}
