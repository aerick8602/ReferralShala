'use client';
import { useUser } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import { HashLoader } from 'react-spinners';

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader size={50} color="#8A2BE2" />
      </div>
    );
  }

  return (
   <>
    <Navbar />
    <div className="flex flex-col justify-center items-center min-h-screen">
      {isSignedIn ? (
        <p className="text-xl">Hello {user.fullName}!</p>
      ) : (
        <p className="text-xl">Home</p>
      )}
    </div>
   </>
  );
}
