'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { useState } from 'react';
import "../styles/Navbar.css";
import Menu from './Menu';
import { redirect } from 'next/navigation';

export default function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      {showSignIn && (
        <div
          className="overlay"
          onClick={() => setShowSignIn(false)}
        >
          <div className="sign-in-modal" onClick={(e) => e.stopPropagation()}>
            <SignIn routing='hash'/>
          </div>
        </div>
      )}

      <div className="strip-message">
        Get exclusive job referrals from industry professionals!! Sign up now and boost your career with ReferralShala....
      </div>
      <div className="nav-main">
        <div className="brand-icon">
          <img onClick={() => { redirect('/'); }} src="/logo.png" alt="Brand Logo" />
        </div>
        <div>
          <SignedIn>
            <Menu />
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
