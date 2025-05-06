'use client';

import Link from 'next/link';
import ThemeToggle from '../theme/NewThemeToggle';

export default function DemoNavBar() {
	return (
		<nav className='w-full bg-background text-foreground border-b border-foreground/10 px-4 py-3 flex items-center justify-between'>
			<div className='flex items-center gap-6'>
				<Link
					href='/'
					className='font-bold text-lg'
				>
					Circles
				</Link>
				<div className='hidden sm:flex gap-4'>
					<Link
						href='/examples/album'
						className='hover:text-primary'
					>
						Albums
					</Link>
					<Link
						href='/settings'
						className='hover:text-primary'
					>
						Settings
					</Link>
				</div>
			</div>
			<div>
				<ThemeToggle />
			</div>
		</nav>
	);
}
