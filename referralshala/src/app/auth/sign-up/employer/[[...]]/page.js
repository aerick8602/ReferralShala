'use client';
import { SignUp } from '@clerk/nextjs';
import '../../../../styles/SignUp.css';
import { redirect } from 'next/navigation';

export default function Page() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <img src="/signupbg.png" className="signupbg" alt="Background" />
      <div className="super-main-signup">
        <div className="signlogo">
          <img
            className="logo"
            src="/logo.png"
            onClick={() => {
              redirect('/');
            }}
            alt="Logo"
          />
        </div>
        <div className="signup">
          <SignUp unsafeMetadata={{ userType: 'employer' }} />
        </div>
      </div>
    </div>
  );
}
