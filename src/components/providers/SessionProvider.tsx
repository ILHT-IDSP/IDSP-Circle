'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';

export function SessionProvider({ children }: { children: React.ReactNode }) {
	const [sessionErrors, setSessionErrors] = useState(0);

	// Monitor for next-auth errors in console
	useEffect(() => {
		// Listen for errors that might indicate session problems
		const originalConsoleError = console.error;
		console.error = (...args) => {
			const errorMessage = args.join(' ');
			if (errorMessage.includes('Failed to fetch') || errorMessage.includes('json') || errorMessage.includes('Unexpected end') || (errorMessage.includes('Error') && errorMessage.includes('auth')) || errorMessage.includes('session')) {
				setSessionErrors(prev => prev + 1);
			}
			originalConsoleError.apply(console, args);
		};

		return () => {
			console.error = originalConsoleError;
		};
	}, []);

	// If we detect multiple session errors, refresh the page
	useEffect(() => {
		if (sessionErrors >= 3) {
			console.log('Multiple session errors detected, refreshing page');
			// Reset counter and refresh the page after 2 seconds
			setSessionErrors(0);
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}
	}, [sessionErrors]);

	return (
		<NextAuthSessionProvider
			refetchOnWindowFocus={false}
			refetchInterval={0}
			refetchWhenOffline={false}
		>
			{children}
		</NextAuthSessionProvider>
	);
}
