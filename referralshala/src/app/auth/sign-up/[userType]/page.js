'use client'
import { SignUp } from "@clerk/nextjs";
import { useParams } from "next/navigation";


export default function Page() {
  const params=useParams()
  console.log(params)
  const user = params?.userType || "Guest";

  return (
    <div>
      <SignUp />
    </div>
  );
}
