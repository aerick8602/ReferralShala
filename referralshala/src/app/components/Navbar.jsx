'use client';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import "../styles/Navbar.css";
import Menu from './Menu';


export default function Navbar({ setShowSignIn,user }) {
  return (
    <>
      <div className="strip-message">Get exclusive job referrals from industry professionals!!  Sign up now and boost your career with ReferralShala....</div>
      <div className="nav-main">
        <div className="brand-icon">
          <img src="/logo.png" alt="Brand Logo" />
        </div>
        <div>
          <SignedIn>
            <Menu user={user}/>
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
