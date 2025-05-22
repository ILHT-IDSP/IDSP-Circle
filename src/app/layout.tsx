import type { Metadata } from 'next';
import './globals.css';
import NextThemeProvider from '../components/theme/NextThemeProvider';
import { SessionProvider } from '../components/providers/SessionProvider';
import ThemeToggle from '@/components/theme/NewThemeToggle';

export const metadata: Metadata = {
	title: 'Circles',
	description: 'A social media app for connecting with friends',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className='antialiased pb-4 lg:pb-0'>
				<SessionProvider>
					<NextThemeProvider>
						{/* <ThemeToggle /> */}
						<div className='mobile-container'>{children}</div>
					</NextThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
