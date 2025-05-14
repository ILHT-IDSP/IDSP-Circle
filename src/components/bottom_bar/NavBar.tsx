'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSearch, FaPlusCircle, FaBell, FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import CreateContainer from '../create/create_container';
import { useSession } from 'next-auth/react';

export default function NavBar() {
	const pathname = usePathname();
	const { data: session } = useSession({ required: false });
	const [createVisibility, setCreateVisibility] = useState(false);
	const [navItems, setNavItems] = useState([
		{ name: 'Explore', path: '/', icon: FaHome },
		{ name: 'Search', path: '/search', icon: FaSearch },
		{ name: 'New', path: '/new', icon: FaPlusCircle },
		{ name: 'Activity', path: '/activity', icon: FaBell },
		{ name: 'Profile', path: '/profile', icon: FaUser },
	]);
	// Update the profile path when session is available
	useEffect(() => {
		// Use type assertion to handle the username property
		interface ExtendedUser {
			username?: string;
		}
		const user = session?.user as ExtendedUser | undefined;
		if (user?.username) {
			setNavItems(prev => prev.map(item => (item.name === 'Profile' ? { ...item, path: `/${user.username}` } : item)));
		}
	}, [session]);

	const toggleCreateContainer = () => {
		setCreateVisibility(() => !createVisibility);
	};

	return (
		<>
			<nav className='fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] flex justify-center'>
				<div className='w-full max-w-xl p-3 flex justify-between px-1'>
					{navItems.map(item => {
						// Check if path matches the base of the current path
						// For profile, this means checking if we're in a username route
						const isProfileItem = item.name === 'Profile';
						const isActive = isProfileItem ? pathname === item.path || (pathname.startsWith('/profile/') && item.path === '/profile') : pathname === item.path;

						if (item.name === 'New') {
							return (
								<div
									key={item.name}
									className='flex flex-col items-center flex-1 py-2 text-foreground/60 transition-colors cursor-pointer'
									onClick={toggleCreateContainer}
								>
									<item.icon className={`h-6 w-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
									<span className='text-xs'>{item.name}</span>
								</div>
							);
						}

						return (
							<Link
								key={item.name}
								href={item.path}
								className={`flex flex-col items-center flex-1 py-2 ${isActive ? 'text-primary' : 'text-foreground/60'} transition-colors`}
							>
								<item.icon className={`h-6 w-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
								<span className='text-xs'>{item.name}</span>
							</Link>
						);
					})}
				</div>
			</nav>
			<CreateContainer
				isVisible={createVisibility}
				onClose={() => setCreateVisibility(false)}
			/>
		</>
	);
}
