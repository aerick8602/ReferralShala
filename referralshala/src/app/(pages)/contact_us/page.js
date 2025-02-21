"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/ContactUs.css";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  return (
    <>
      <Navbar userId={userId} />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          We are here to assist you! Feel free to reach out to either of us
          using the contact details below.
        </p>
        <div className="contact-card-wrapper">
          <div className="contact-card">
            <div className="contact-image-wrapper">
              {/* <img src="/user.png" alt="Profile" className="contact-image" /> */}
              <img
                src="/uploads/huehue.png"
                alt="Profile"
                className="contact-image"
              />
            </div>
            <h2 className="contact-name">Ayush Katiyar</h2>
            <p className="contact-institute">NIT Bhopal</p>
            <p className="contact-bio">
              Hi 👋, I&apos;m Ayush Katiyar. Feel free to reach out for any
              inquiries or collaborations!
            </p>
            <div className="contact-links">
              <a
                href="mailto:katiyarayush02@gmail.com"
                className="contact-link"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-katiyar-6a0935238/"
                target="_blank"
                className="contact-link"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-image-wrapper">
              {/* <img src="/user.png" alt="Profile" className="contact-image" /> */}
              <img
                src="/uploads/cheems.png"
                alt="Profile"
                className="contact-image"
              />
            </div>
            <h2 className="contact-name">Aditya Sawner</h2>
            <p className="contact-institute">LNCT Bhopal</p>
            <p className="contact-bio">
              Hello , I&apos;m Aditya Sawner. Let&apos;s connect and make
              amazing things together!
            </p>
            <div className="contact-links">
              <a
                href="mailto:adityasawner19@gmail.com"
                className="contact-link"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-sawner/"
                target="_blank"
                className="contact-link"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer userId={userId} />
    </>
  );
}
