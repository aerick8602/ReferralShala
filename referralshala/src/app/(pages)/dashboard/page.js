'use client'

import { useUser } from "@clerk/nextjs";
import Navbar from "../../components/Navbar";

export default function DashboardPage(){
  const { isSignedIn, user, isLoaded } = useUser();
    return (
      <div>
        <Navbar></Navbar>
        <h1>Hii!! {user?.firstName} </h1>
        <p>Welcome to your Dashboard</p>
      </div>
    );
  };
  
  