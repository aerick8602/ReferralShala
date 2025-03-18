"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Error({ reset }) {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          position: "relative",
          padding: "2rem",
        }}
      >
        <img
          src="/network.png"
          alt="Error"
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
            Oops!
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#4b5563",
              marginTop: "0.5rem",
            }}
          >
            Something went wrong.
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
            An unexpected error occurred. Please try again later. If the problem
            persists, contact our support team for assistance.
          </p>
          <button
            onClick={() => reset()}
            style={{
              border: "none",
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              color: "#ffffff",
              backgroundColor: "rgb(254,87,87)",
              borderRadius: "0.5rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "500",
              letterSpacing: "3",
            }}
          >
            Retry
          </button>
          <br />
          <Link
            href="/"
            style={{
              marginTop: "1rem",
              textDecoration: "none",
              color: "rgb(254,87,87)",
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
