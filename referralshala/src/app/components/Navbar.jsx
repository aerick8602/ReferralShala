"use client";
import Link from "next/link";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import Menu from "./Menu";
import { redirect } from "next/navigation";

export default function Navbar({ userId, userType }) {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      {showSignIn && (
        <div className="overlay" onClick={() => setShowSignIn(false)}>
          <div className="sign-in-modal" onClick={(e) => e.stopPropagation()}>
            <SignIn routing="hash" />
          </div>
        </div>
      )}

      <div className="strip-message">
        {userId ? (
          <p>
            Welcome back!! Explore personalized job referrals and boost your
            career today!
          </p>
        ) : (
          <p>
            Get exclusive job referrals from industry professionals!! Sign up
            now and boost your career with ReferralShala!!
          </p>
        )}
      </div>
      <div className="nav-main">
        <div className="brand-icon">
          <img
            onClick={() => {
              redirect("/");
            }}
            src="/logo.png"
            alt="Brand Logo"
          />
        </div>
        <div>
          <SignedIn>
            <Menu userId={userId} userType={userType} />
          </SignedIn>
          <SignedOut>
            <div className="button-group">
              <button
                className="login-button"
                onClick={() => setShowSignIn(true)}
              >
                Login
              </button>
              <Link href="/auth/sign-up/candidate" className="signup-button">
                Candidate Sign-up
              </Link>
              <Link href="/auth/sign-up/employer" className="signup-button">
                Employer Sign-up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
