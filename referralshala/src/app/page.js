"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HashLoader } from "react-spinners";
import "./styles/Home.css";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUserId = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await axios.get(`/api/user/${user.id}`);
      setUserData(response.data.data);
      console.log("Fetched User Data:", response.data.data);
    } catch (err) {
      console.error("Error fetching user data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUserId();
    }
  }, [isSignedIn]);
  if (isSignedIn && (loading || !userData.userId || !userData.userType)) {
    return (
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Navbar
        userId={userData.userId}
        userType={userData.userType}
        clerkID={user?.id.replace("user_", "")}
      />
      <div className="Home">
        <img className="backgroundImage" src="/bg.png" alt="Background" />
        <div className="main-content">
          {isSignedIn ? (
            <div className="main-content" style={{ marginTop: "90px" }}>
              <section className="greet">
                <h1>
                  Hii, {user?.firstName} {"🙌"}
                </h1>
                <p>
                  Discover your path to success with trusted referrals and
                  valuable connections.
                </p>
              </section>
            </div>
          ) : (
            <div className="main-content" style={{ marginTop: "90px" }}>
              <section className="greet">
                <h1>Welcome to ReferralShala</h1>
                <p>
                  Your gateway to trusted referrals and career opportunities.
                </p>
              </section>
            </div>
          )}
          <div className="logos-wrapper">
            <div className="logos logos-row-1">
              <div className="logos-slide">
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />

                {/* Duplicate for looping */}
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
              </div>
            </div>
            <div className="logos logos-row-2">
              <div className="logos-slide">
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                {/* Duplicate for looping */}
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
                <img src="/logo.png" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
