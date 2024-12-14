import Link from "next/link";
import '../styles/Navbar.css'

export default function Navbar() {
    return (
      <div className="nav-main">
        <div className="nav-icon">
         <strong>ReferralShala</strong>
        </div>
        <div className="nav-links-container">
            <Link href="/auth/sign-in" className="nav-link">
              Login
            </Link>
            <Link href="/auth/sign-up" className="nav-link">
              Candidate Sign-up
            </Link>
            <Link href="/auth/sign-up" className="nav-link">
              Employer Sign-up
            </Link>
        </div>
      </div>
    );
  }
  