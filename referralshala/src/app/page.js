'use client'
import { SignIn, useUser } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import { HashLoader } from 'react-spinners';
import { redirect } from "next/navigation";
import { useState } from "react";
import "./styles/Home.css";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);

  if (isSignedIn) {
    redirect('/dashboard');
  }

  if (!isLoaded) {
    return (
      <div className="loader-container">
        <HashLoader size={50} color="#8A2BE2" />
      </div>
    );
  }

  return (
    <>
      <Navbar setShowSignIn={setShowSignIn} />
      <div
        className={`main-content ${showSignIn ? 'blur' : ''}`}
      >
        <p className="home-text">Home</p>
      </div>

      {showSignIn && (
        <div
          className="overlay"
          onClick={() => setShowSignIn(false)}
        >
          <div className="sign-in-modal" onClick={(e) => e.stopPropagation()}>
            <SignIn routing="hash" />
          </div>
        </div>
      )}
    </>
  );
}