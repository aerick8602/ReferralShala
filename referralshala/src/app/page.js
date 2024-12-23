'use client';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { HashLoader } from 'react-spinners';
import './styles/Home.css';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is imported

export default function Home() {

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(true);

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`/api/user/${user.id}`);
      setUserData(response.data.data);
    } catch (err) {
      console.error("Error fetching user data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchUserId();  
    }
  }, [isLoaded, isSignedIn, user]); 

  if (!isLoaded || !isSignedIn || Loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Navbar userId={userData.userId} />
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
