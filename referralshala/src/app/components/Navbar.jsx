'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import { SignedOut, useUser } from '@clerk/clerk-react';
import '../styles/Navbar.css'

export default function Navbar() {
  const [userType, setUserType] = useState(null);


  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const handleUserTypeChange = (userType) => {
    localStorage.setItem('userType', userType);
    setUserType(userType);
  };

  return (
    <div className="nav-main">
      <div className="nav-icon">
        <strong>ReferralShala</strong>
      </div>
      <SignedIn>
      <SignOutButton>
            <button className="nav-link">Sign Out</button>
      </SignOutButton>
      </SignedIn>
      <SignedOut>
      <div className="nav-links-container">
          <Link href="/auth/sign-in" className="nav-link">
            Login
          </Link>
          <Link
            href="/auth/sign-up"
            className="nav-link"
            onClick={() => handleUserTypeChange('CANDIDATE')}
          >
            Candidate Sign-up
          </Link>
          <Link
            href="/auth/sign-up"
            className="nav-link"
            onClick={() => handleUserTypeChange('EMPLOYER')}
          >
            Employer Sign-up
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}
