'use client'
import { SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';
import Navbar from './components/Navbar'
export default function Home() {

return (
    <div>
        <Navbar></Navbar>
        <SignInButton></SignInButton>
        Home Page
        <div>   
      <SignOutButton>

      </SignOutButton>
    </div>
    </div>
  );
}
