"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          position: "relative",
          padding: "2rem",
        }}
      >
        <img
          src="/network.png"
          alt="Not Found"
          style={{
            width: "50%",
            height: "auto",
            position: "absolute",
            right: "5%",
            top: "55%",
            transform: "translateY(-50%)",
            opacity: "0.6",
          }}
        />
        <div
          style={{
            maxWidth: "500px",
            zIndex: 1,
          }}
        >
          <h1
            style={{ fontSize: "6rem", fontWeight: "bold", color: "#1f2937" }}
          >
            404
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#4b5563",
              marginTop: "0.5rem",
            }}
          >
            Oops! The page you are looking for does not exist.
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.8rem",
              color: "#6b7280",
              marginTop: "1rem",
              width: "100%",
            }}
          >
            It looks like the link may be broken or the page has been removed.
            Please check the URL and try again. If you believe this is an error,
            feel free to contact our support team for assistance.
          </p>

          <Link
            href="/"
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              color: "#ffffff",
              backgroundColor: "rgb(254,87,87)",
              borderRadius: "0.5rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Go Back Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
