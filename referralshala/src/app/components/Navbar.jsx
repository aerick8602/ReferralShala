'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import "../styles/Navbar.css";

export default function Navbar({ setShowSignIn }) {
  return (
    <div className="nav-main">
      <div className="brand-icon">
        <img src="/ReferralShala.png"></img>
      </div>
      <div>
        <SignedIn>
          <SignOutButton>
            <button
              className="sign-out-button"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <div className="button-group">
            {/* <button
              className="login-button"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </button> */}
             <Link href="/auth/sign-in" className="login-button">
              Login
            </Link>
            <Link href="/auth/sign-up/candidate" className="signup">
              Candidate Sign-up
            </Link>
            <Link href="/auth/sign-up/employer" className="signup">
              Employer Sign-up
            </Link>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}