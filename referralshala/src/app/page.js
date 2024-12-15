'use client'
import { SignInButton } from '@clerk/nextjs';
import Navbar from './components/Navbar'
export default function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <SignInButton></SignInButton>
        Home Page
    </div>
  );
}
