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
		{ name: 'home', path: '/', icon: FaHome },
		{ name: 'Search', path: '/search', icon: FaSearch },
		{ name: 'New', path: '/new', icon: FaPlusCircle },
		{ name: 'Activity', path: '/activity', icon: FaBell },
		{ name: 'Profile', path: '/profile', icon: FaUser },
	]);
	useEffect(() => {
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
			<nav className='fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] flex justify-center '>
				<div className='w-full max-w-xl p-2 flex justify-between border-t border-border/40'>
					{navItems.map(item => {
						const isProfileItem = item.name === 'Profile';
						const isActive = isProfileItem ? pathname === item.path || (pathname.startsWith('/profile/') && item.path === '/profile') : pathname === item.path;

						if (item.name === 'New') {
							return (
								<div
									key={item.name}
									className={`flex flex-col items-center flex-1 py-2 transition-colors cursor-pointer rounded-md 
                                    ${isActive ? 'text-[var(--primary)] font-medium' : 'text-[var(--foreground)] opacity-70'} 
                                    hover:bg-[var(--foreground)]/5 hover:text-[var(--primary)]`}
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
								className={`flex flex-col items-center flex-1 py-2 rounded-md transition-all duration-200 
                                ${isActive ? 'text-[var(--primary)] font-medium' : 'text-[var(--foreground)] opacity-70'} 
                                hover:bg-[var(--foreground)]/5 hover:text-[var(--primary)]`}
							>
								<item.icon className={`h-6 w-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
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
