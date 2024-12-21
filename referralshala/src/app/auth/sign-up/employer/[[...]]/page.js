'use client'
import { SignUp } from "@clerk/nextjs";
import '../../../../styles/SignUp.css';
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

export default function Page() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
   <>{loading?(
    <div style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <HashLoader size={35} color="#fe5757" />
  </div>
  ):(
    <div className="super-main-signup">
    <img className="bg" src="/pngwing.com.png" alt="Background" />
    <div className="signup">
      <div className="signup-main-content">
        <img className="logo" src="/logo.png" alt="Logo" />
        <div className="sign-up-content">
          <p className="welcome-text">Welcome to <b style={{color:'#fe5757'}}>Referral</b>Shala!</p>
          <p className="sub-header">Where Growth Meets Opportunity.</p>
        </div>
        <div className="signup-subtext">
          <em>
            Sign Up Today and Begin Your Journey with <strong>ReferralShala{'🌟'}</strong>
          </em>
          <em>Your next big opportunity is just a referral away.</em>
        </div>
        <div className="placeholder-box"></div>
      </div>
      <div className="signup-container">
        <SignUp unsafeMetadata={{ userType: "employer" }} />
      </div>
    </div>
  </div>
  )
  }
   </>
    
  );
}
