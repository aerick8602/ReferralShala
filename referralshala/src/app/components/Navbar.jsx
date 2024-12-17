'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SignOutButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import '../styles/Navbar.css'

export default function Navbar() {
  const [userType, setUserType] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();

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
      {isSignedIn ? (
        <div className="nav-links-container">
          <SignOutButton>
            <button className="nav-link">Sign Out</button>
          </SignOutButton>
        </div>
      ) : (
        <div className="nav-links-container">
          <Link href="/auth/sign-in" className="nav-link">
            Login
          </Link>
          <Link
            href="/auth/sign-up/candidate"
            className="nav-link"
            onClick={() => handleUserTypeChange('CANDIDATE')}
          >
            Candidate Sign-up
          </Link>
          <Link
            href="/auth/sign-up/employer"
            className="nav-link"
            onClick={() => handleUserTypeChange('EMPLOYER')}
          >
            Employer Sign-up
          </Link>
        </div>
      )}
    </div>
  );
}
