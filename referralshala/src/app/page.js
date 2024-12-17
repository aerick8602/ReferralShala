'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import Navbar from './components/Navbar';



export default function  Home() {
  
  return (
    <div>
      <Navbar />
      <SignedIn>
        <p>Hii</p>
      </SignedIn>
      <SignedOut>
        <p>You are not signed in. Please sign in to view your data.</p>
      </SignedOut>
    </div>
  );
}
