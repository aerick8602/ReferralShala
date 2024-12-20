'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { HashLoader } from "react-spinners";
import axios from 'axios';

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${user.id}`);
      setUserData(response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);
  

  if (!isLoaded || !isSignedIn || Loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl">
          Hello {user?.firstName || "User"}. Here's your Dashboard. You are a {userData.userType}.
        </p>
      </div>
      <Footer></Footer>
    </>
  );
}
