'use client';

import { useSession } from 'next-auth/react';
import { usePathname, redirect } from 'next/navigation';
import { useEffect } from 'react';

// Define public paths that don't require authentication
const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/register',
];

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  
  useEffect(() => {
    // If user is not authenticated and trying to access a protected route
    if (status === 'unauthenticated' && !isPublicPath) {
      redirect('/auth/login');
    }
    
    // If user is authenticated and trying to access login/register
    if (status === 'authenticated' && isPublicPath) {
      redirect('/profile');
    }
  }, [status, pathname, isPublicPath]);
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If it's a public path or user is authenticated, render children
  if (isPublicPath || status === 'authenticated') {
    return <>{children}</>;
  }
  
  // This should not be rendered due to the redirect in useEffect,
  // but it's here as a fallback
  return null;
}
