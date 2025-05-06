interface SettingsCategoryProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

export default function SettingsCategory({ title, children, className = '' }: SettingsCategoryProps) {
	return (
		<section className={`mb-4 sm:mb-6 ${className}`}>
			<h2 className='mb-2 sm:mb-3 text-background bg-primary'>{title}</h2>
			<div className='space-y-2 sm:space-y-3'>{children}</div>
		</section>
	);
}
