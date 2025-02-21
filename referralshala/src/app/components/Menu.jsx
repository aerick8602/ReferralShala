"use client";

import React, { useState, useRef, useEffect } from "react";
import { TieredMenu } from "primereact/tieredmenu";
import { Avatar } from "primereact/avatar";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";

export default function AccountMenu({ userId }) {
  const { signOut } = useClerk();
  const router = useRouter();
  const { user } = useUser();
  const Name = user?.firstName?.charAt(0).toUpperCase() || "?";

  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    {
      label: "Home",
      command: () => router.push("/"),
    },
    {
      label: "Profile",
      command: () => router.push(userId ? `/profile/${userId}` : "/"),
    },
    {
      label: "Dashboard",
      command: () => router.push(userId ? `/dashboard/${userId}` : "/"),
    },
    {
      separator: true,
    },
    {
      label: "More",
      items: [
        {
          label: "About Us",
          icon: "pi pi-info-circle",
          command: () => router.push(`/about_us?userId=${userId}`),
        },
        {
          label: "Privacy Policy",
          icon: "pi pi-lock",
          command: () => router.push(`/privacy_policy?userId=${userId}`),
        },
        {
          label: "Contact Us",
          icon: "pi pi-envelope",
          command: () => router.push(`/contact_us?userId=${userId}`),
        },
        {
          label: "Terms & Conditions",
          icon: "pi pi-book",
          command: () => router.push(`/terms_&_conditions?userId=${userId}`),
        },
      ],
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => signOut({ redirectUrl: "/" }),
    },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }

    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuVisible]);

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      {/* Avatar Button */}
      <Avatar
        label={Name}
        shape="circle"
        style={{
          width: "40px",
          height: "40px",
          border: "2px solid #FE5757",
          color: "#FE5757",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          transition: "background 0.3s ease-in-out",
        }}
        onClick={() => setMenuVisible(!menuVisible)}
      />

      {/* Fixed Position Menu */}
      {menuVisible && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: "55px", // Adjust this based on your navbar height
            right: "45px",
            zIndex: 1000,
            background: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            border: "1px solid #ddd",
            width: "200px",
          }}
        >
          <TieredMenu model={menuItems} style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}
