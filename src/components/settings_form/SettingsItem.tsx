import Link from 'next/link';
import { ReactNode } from 'react';

type SettingsItemProps = {
	label: string;
	icon?: ReactNode;
	href?: string;
	onClick?: () => void;
};

export default function SettingsItem({ label, icon, href, onClick }: SettingsItemProps) {
	const classes = 'w-full flex items-center justify-between p-3 sm:p-4 rounded-lg transition cursor-pointer hover:opacity-90';

	const content = (
		<div className='flex items-center justify-between w-full'>
			<div className='flex items-center gap-2 sm:gap-3'>
				{icon && <span className='text-lg sm:text-xl'>{icon}</span>}
				<span className='text-xs sm:text-sm'>{label}</span>
			</div>
			<span className='text-xs sm:text-sm'>{`>`}</span>
		</div>
	);
	return href ? (
		<Link
			href={href}
			className={`${classes} bg-foreground text-background border`}
		>
			{content}
		</Link>
	) : (
		<div
			className={`${classes} bg-foreground text-background`}
			onClick={onClick}
		>
			{content}
		</div>
	);
}
