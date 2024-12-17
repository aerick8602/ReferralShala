'use client';

import { useUser } from "@clerk/nextjs";
import { HashLoader } from "react-spinners";

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div>
      {!isLoaded ? (
        <div className="flex items-center justify-center h-screen">
          <HashLoader color="#36d7b7" size={80} />
        </div>
      ) : (
        <>
          {/* Content after user is loaded */}
          <h1>Hii!! {user?.firstName}</h1>
          <p>Welcome to your Dashboard</p>
        </>
      )}
    </div>
  );
}
