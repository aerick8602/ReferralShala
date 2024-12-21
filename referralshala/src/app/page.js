'use client';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { HashLoader } from 'react-spinners';
import './styles/Home.css';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  
  const { isSignedIn, user, isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Navbar/>



      <div className="Home">
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
