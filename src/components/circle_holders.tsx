import Image from 'next/image';

interface CircleHolderProps {
	imageSrc: string;
	name?: string;
	altText?: string;
	circleSize?: number;
	className?: string;
	showName?: boolean;
}

const CircleHolder: React.FC<CircleHolderProps> = ({ imageSrc, name, altText, circleSize = 100, className = '', showName = true }) => {
	const baseSize = typeof circleSize === 'number' ? circleSize : 100;

	return (
		<div className={`flex flex-col items-center ${className}`}>
			{' '}
			<div className='rounded-full overflow-hidden flex items-center justify-center border'>
				<Image
					src={imageSrc}
					alt={altText || `${name}'s profile picture`}
					width={baseSize}
					height={baseSize}
					className='w-full h-full object-cover aspect-square'
				/>
			</div>{' '}
			{showName && name && <h3 className='mt-1 sm:mt-2 text-center font-medium text-sm sm:text-base '>{name}</h3>}
		</div>
	);
};

export default CircleHolder;
