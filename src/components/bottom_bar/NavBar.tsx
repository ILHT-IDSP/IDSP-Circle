'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSearch, FaPlusCircle, FaBell, FaUser } from 'react-icons/fa';

const navItems = [
  { name: 'Explore', path: '/', icon: FaHome },
  { name: 'Search', path: '/search', icon: FaSearch },
  { name: 'New', path: '/new', icon: FaPlusCircle },
  { name: 'Activity', path: '/activity', icon: FaBell },
  { name: 'Profile', path: '/profile', icon: FaUser },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] flex justify-center">
      <div className="w-full max-w-xl p-3 flex justify-between px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center flex-1 py-2 ${isActive ? 'text-primary' : 'text-foreground/60'} transition-colors`}
            >
              <item.icon className={`h-6 w-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}