'use client';

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Navbar from './components/Navbar';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { redirect } from 'next/navigation';


export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/user/${user.id}`);
      setUserData(response.data.data);
      console.log("Fetched user data:", response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const createUserInTable = async () => {
    if (userType && user.id) {
      try {
        const table = userType === 'CANDIDATE' ? 'candidate' : 'employer';
        const response = await axios.post(`/api/${table}`, {
          userId: userData.id,
        });
        console.log(`${table} created for user ${user.id}`);
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
    if (userType && userData.id) {
      redirect(`/profile/${userType.toLowerCase()}/${userData.id}`);
    }
  }, [userData]);

  return (
    <div>
      <Navbar />
      <SignedIn>
        <p>Hii {user?.firstName}</p>
      </SignedIn>
      <SignedOut>
        <p>You are not signed in. Please sign in to view your data.</p>
      </SignedOut>
    </div>
  );
}
