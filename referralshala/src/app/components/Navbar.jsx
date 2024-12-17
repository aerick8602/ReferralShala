'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import '../styles/Navbar.css';
import { redirect } from 'next/navigation';

export default function Navbar() {
  return (
    <div className="nav-main">
      <div className="nav-icon">
        ReferralShala
      </div>
      <SignedIn>
        <button onClick={()=>{redirect('/')}}><SignOutButton ></SignOutButton></button>
      </SignedIn>
      <SignedOut>
      <div className="nav-links-container">
          <Link href="/auth/sign-in" className="nav-link">
            Login
          </Link>
          <Link
            href="/auth/sign-up/candidate"
            className="nav-link"
          >
            Candidate Sign-up
          </Link>
          <Link
            href="/auth/sign-up/employer"
            className="nav-link"
          >
            Employer Sign-up
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}
