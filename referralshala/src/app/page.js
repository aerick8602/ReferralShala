'use client';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { HashLoader } from 'react-spinners';
import { useState } from 'react';
import './styles/Home.css';
import { useUser } from '@clerk/nextjs';
import { SignIn } from '@clerk/clerk-react';

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);

  if (!isLoaded) {
    return (
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Navbar setShowSignIn={setShowSignIn} />

      {showSignIn && (
        <div
          className="overlay"
          onClick={() => setShowSignIn(false)}
        >
          <div className="sign-in-modal" onClick={(e) => e.stopPropagation()}>
            <SignIn routing="hash" />
          </div>
        </div>
      )}

      <div className={`Home ${showSignIn ? 'blur-slight' : ''}`}>
        <div className="main-content">
          {isSignedIn ? (
            <div className="main-content" style={{ marginTop: '90px' }}>
              <section className="greet">
                <h1>Hii, {user?.firstName} {"🙌"}</h1>
                <p>Your gateway to trusted referrals and career opportunities.</p>
      
              </section>
            </div>
          ) : (
            <div className="main-content" style={{ marginTop: '90px' }}>
              <section className="greet">
                <h1>Welcome to ReferralShala</h1>
                <p>Your gateway to trusted referrals and career opportunities.</p>
              </section>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
