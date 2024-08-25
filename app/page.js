// app/upload/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/upload'); // Redirect to upload page if signed in
    }
  }, [isSignedIn, router]);

  return (
    <main className={styles.main}>
     <div className={styles.ombreOverlay}></div>

      <div className={styles.description}>
        <h1 className="mainHead"> JellyClip </h1>
        <h2 className="subHead"> Your content creation companion </h2>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
      </div>

    </main>
  );
}
