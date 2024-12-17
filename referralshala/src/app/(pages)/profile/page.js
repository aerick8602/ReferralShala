'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage(){
  const { isSignedIn, user, isLoaded } = useUser();
    const [userType, setUserType] = useState(null);
    const [userData, setUserData] = useState({});

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${user.id}`);
        setUserData(response.data.data);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }
    };
  
    const createUserInTable = async () => {
      if (userType && userData.id) {
        try {
          const table = userType === 'CANDIDATE' ? 'candidate' : 'employer';
          const response = await axios.post(`/api/${table}`, {
            userId: userData.id,
          });
          console.log(`${table} created for user ${userData.id}`);
        } catch (err) {
          console.log("Error creating user in table:", err.message);
        }
      }
    };
  
    useEffect(() => {
      const storedUserType = localStorage.getItem('userType');
      if (storedUserType) {
        setUserType(storedUserType);
      }
      if (isSignedIn && user?.id) {
        fetchUserData();
      }
    }, [isSignedIn, user]);
  
    useEffect(() => {
      createUserInTable();
    }, [userData]);
  
    return (
      <div>
        <h1>Hii!! {user?.firstName} </h1>
        <p>Welcome to your Profile page!</p>
      </div>
    );
  };
  
  