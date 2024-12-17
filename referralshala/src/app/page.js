'use client';

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Navbar from './components/Navbar';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';


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
