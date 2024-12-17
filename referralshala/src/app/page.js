'use client';

import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { HashLoader } from 'react-spinners';

export default function Home() {
  const { isLoaded } = useAuth();

  return (
    <div>
      {!isLoaded ? (
        <div className="flex items-center justify-center h-screen">
          <HashLoader color="#36d7b7" size={80} />
        </div>
      ) : (
        <>
          <SignedIn>
            <p>Hii</p>
          </SignedIn>
          <SignedOut>
            <p>You are not signed in. Please sign in to view your data.</p>
          </SignedOut>
        </>
      )}
    </div>
  );
}
