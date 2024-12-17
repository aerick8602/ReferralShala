'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, SignOutButton, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import '../styles/Navbar.css';

export default function Navbar() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');  
  };

  return (
    <div className="nav-main">
      <div className="nav-icon">
        ReferralShala
      </div>
      <SignedIn>
        <button onClick={handleSignOut} className="nav-link">
          Sign Out
        </button>
      </SignedIn>
      <SignedOut>
        <div className="nav-links-container">
          <Link href="/auth/sign-in" className="nav-link">
            Login
          </Link>
          <Link href="/auth/sign-up/candidate" className="nav-link">
            Candidate Sign-up
          </Link>
          <Link href="/auth/sign-up/employer" className="nav-link">
            Employer Sign-up
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}
