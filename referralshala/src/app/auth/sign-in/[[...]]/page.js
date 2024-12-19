// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <SignIn/>
//     </div>
//   );
// }


import { SignIn } from "@clerk/nextjs";
import '../../../styles/Login.css'
export default function Page() {
  return (
    <div className="super-main">
      <div className="sign-in-logo">
      <img src='/ReferralShala.png' alt="none" className="image"></img>
      <br />
        Welcome To 
        <br />
        AlumniSphere
      </div>
    <div className="vertical"></div>
    <div className="sign-in-main">
      <SignIn  classNamae="sign-in" afterSignOutUrl="/" />
    </div>
    </div>
  );
}