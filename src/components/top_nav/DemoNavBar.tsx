'use client';

import Link from 'next/link';
import ThemeToggle from '../theme/NewThemeToggle';

export default function DemoNavBar() {
	return (
		<nav className='w-full max-w-xl mx-auto bg-background text-foreground border-b border-foreground/10 px-4 py-3 flex items-center justify-between'>
			<div className='flex items-center gap-6'>
				<Link
					href='/'
					className='font-bold text-lg'
				>
					Circles
				</Link>
				<div className='hidden sm:flex gap-4'>
					<Link
						href='/profile'
						className='hover:text-primary'
					>
						Profile
					</Link>
					<Link
						href='/settings'
						className='hover:text-primary'
					>
						Settings
					</Link>
					<Link
						href={'/auth/login'}
						className = 'hover:text-primary'
					>
					Login
					</Link>
				</div>
			</div>
			<div>
				<ThemeToggle />
			</div>
		</nav>
	);
}
