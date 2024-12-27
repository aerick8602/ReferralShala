'use client';

import { useParams } from "next/navigation";
import CandidateProfile from "./candidateprofile"
import EmployerProfile from "./employerprofile"
 
export default function ProfilePage() {
    const params=useParams();
    const userType=params.params[0];
    const userId=params.params[1];

    return (
        <>
        {userType==="candidate"?
        (
          <CandidateProfile userId={userId}/>
        ):
        (
          <EmployerProfile userId={userId}/>
        )}
        </>
    );
}

 