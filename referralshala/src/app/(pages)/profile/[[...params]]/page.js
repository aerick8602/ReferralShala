'use client'

import { useUser } from "@clerk/nextjs";

export default async function ProfilePage(){
  const { isSignedIn, user, isLoaded } = useUser();
    return (
      <div>
        <h1>Hii!! {user.firstName} </h1>
        <p>Welcome to your Profile page!</p>
      </div>
    );
  };
  
  