import Image from 'next/image';
import Link from 'next/link';

interface CircleHolderProps {
	imageSrc: string;
	name?: string;
	altText?: string;
	circleSize?: number;
	className?: string;
	showName?: boolean;
	link?: string;
}

const CircleHolder: React.FC<CircleHolderProps> = ({ imageSrc, name, altText, circleSize = 100, className = '', showName = true, link }) => {
	const baseSize = typeof circleSize === 'number' ? circleSize : 100;
	return (
		<div className={`flex flex-col items-center ${className}`}>
			<div
				className='rounded-full overflow-hidden flex items-center justify-center border'
				style={{ width: baseSize, height: baseSize }}
			>
				{' '}
				{link ? (
					<Link
						href={link}
						className='w-full h-full block'
					>
						<Image
							src={imageSrc}
							alt={altText || `${name}'s profile picture`}
							width={baseSize}
							height={baseSize}
							quality={90}
							className='object-cover'
							sizes={`${baseSize}px`}
							priority
						/>
					</Link>
				) : (
					<Image
						src={imageSrc}
						alt={altText || `${name}'s profile picture`}
						width={baseSize}
						height={baseSize}
						quality={90}
						className='object-cover'
						sizes={`${baseSize}px`}
						priority
					/>
				)}
			</div>
			{showName && name && (
				<h3
					className='mt-1 sm:mt-2 text-center text-sm'
					// this style tag makes it so that if the name is too long it gets cut off and ends with '...'
					style={{ maxWidth: `${baseSize}px`, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
				>
					{link ? (
						<Link
							href={link}
							className='hover:underline'
						>
							{name}
						</Link>
					) : (
						name
					)}
				</h3>
			)}
		</div>
	);
};

export default CircleHolder;
