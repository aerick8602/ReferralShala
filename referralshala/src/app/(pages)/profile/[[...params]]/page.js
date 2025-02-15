"use client";

import { useParams } from "next/navigation";
import CandidateProfile from "./candidateprofile";
import EmployerProfile from "./employerprofile";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser();
  const params = useParams();
  const userType = params.params[0];
  const userId = params.params[1];
  const clerkID = params.params[2];
  const isauth = "user_" + clerkID == user.id;

  return (
    <>
      {userType === "candidate" ? (
        <CandidateProfile userId={userId} isauth={isauth} />
      ) : (
        <EmployerProfile userId={userId} isauth={isauth} />
      )}
    </>
  );
}
