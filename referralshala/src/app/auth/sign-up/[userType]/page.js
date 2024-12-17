import {SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <SignUp routing="hash"/>
    </div>
  );
}
