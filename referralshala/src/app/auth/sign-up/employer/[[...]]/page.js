// import {SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <SignUp unsafeMetadata={{userType:"employer"}}/>
//     </div>
//   );
// }


import { SignUp } from "@clerk/nextjs";
import '../../../../styles/SignUp.css'
export default function Page() {
  return (
    <div className="super-main-signup">
    <div className="sign-up-logo">
    <img src='/ReferralShala.png' alt="none" className="image"></img>
    <br />
      Welcome To 
      <br />
      AlumniSphere
    </div>
  <div className="vertical"></div>
  <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'50%'}}>
    <SignUp unsafeMetadata={{userType:"employer"}}/>
  </div>
  </div>
  );
}