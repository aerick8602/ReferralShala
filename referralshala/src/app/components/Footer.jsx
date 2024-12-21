'use client'
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import "../styles/Footer.css";
import { redirect } from "next/navigation";

const Footer = () => {
  return (
    <div className="footer">
      <div className="header">
        <div className="inner-header">
          <h1 className="title">Where Growth Meets Opportunity</h1>
        </div>
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      <footer className="footer-content">
        <div className="footer-links">
        <div className="brand-icon">
            <img onClick={()=>{redirect('/')}} src="/logo.png" alt="Brand Logo" />
            <p className="footer-about">
            <strong>Why we started?</strong>
            <br/>
            At <span className="brand-name">ReferraShala</span>, we believe that every individual deserves the opportunity to reach their full potential. Finding the right job or internship should not be a struggle, but a journey of growth and success. 
            <br/>
            Our mission is to bridge the gap between talent and opportunities by providing referrals that are tailored to your career goals. Whether it's location, industry, or role, ReferraShala is here to help you navigate the job market with confidence.
            </p>
          </div>
          <div>
            <h4>Referrals by Location</h4>
            <ul>
              <li><a href="#">Referral in India</a></li>
              <li><a href="#">Referral in Delhi</a></li>
              <li><a href="#">Referral in Bangalore</a></li>
              <li><a href="#">Referral in Mumbai</a></li>
              <li><a href="#">Virtual referrals</a></li>
              <li><a href="#">View all referrals</a></li>
            </ul>
          </div>

          <div>
            <h4>Referrals by Stream</h4>
            <ul>
              <li><a href="#">Computer Science Referrals</a></li>
              <li><a href="#">Mechanical Referrals</a></li>
              <li><a href="#">Marketing Referrals</a></li>
              <li><a href="#">Finance Referrals</a></li>
              <li><a href="#">Campus Ambassador Program</a></li>
              <li><a href="#">View all referrals</a></li>
            </ul>
          </div>

          
        </div>
        <br></br>
        <strong><hr></hr><hr></hr></strong>
        <div className="bottom-section">
          <div className="footer-links-bottom">
            <a href="/about_us">About us</a>
            <a href="privacy_policy">Privacy Policy</a>
            <a href="contact_us">Contact us</a>
            <a href="terms_&_conditions">Terms & Conditions</a>
          </div>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <p className="footer-text">
          &copy; 2024 ReferraShala. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
