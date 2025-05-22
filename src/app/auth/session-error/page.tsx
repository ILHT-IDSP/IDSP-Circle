'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function SessionErrorPage() {
  useEffect(() => {
    // Log the error to the console
    console.error('Session error page loaded - there was an issue with your authentication session');
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/auth/login' });
    } catch (error) {
      console.error('Error signing out:', error);
      window.location.href = '/auth/login'; // Fallback
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Session Error</h1>
      <p className="mb-6 text-[var(--foreground-secondary)]">
        We encountered an issue with your session. This may be due to network issues or expired credentials.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={handleSignOut}
          className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg font-medium"
        >
          Sign Out and Sign In Again
        </button>
        <Link
          href="/"
          className="bg-[var(--background-secondary)] text-[var(--foreground)] px-6 py-2 rounded-lg font-medium"
        >
          Try to Return Home
        </Link>
      </div>
    </div>
  );
}
