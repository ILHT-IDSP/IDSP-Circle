import Image from 'next/image';

interface CircleHolderProps {
	imageSrc: string;
	name: string;
	altText?: string;
	circleSize?: number; 
	className?: string;
}

const CircleHolder: React.FC<CircleHolderProps> = ({
	imageSrc,
	name,
	altText,
	circleSize = 100,
	className = '',
}) => {
	// Calculate responsive size based on viewport
	const baseSize = typeof circleSize === 'number' ? circleSize : 100;
	const mobileSize = baseSize * 0.8; // 80% of the original size on mobile
	
	return (
		<div className={`flex flex-col items-center ${className}`}>
			<div 
				className="rounded-full overflow-hidden flex items-center justify-center"
				style={{ 
					width: `clamp(${mobileSize}px, ${baseSize * 0.05}vw + ${mobileSize * 0.7}px, ${baseSize}px)`,
					height: `clamp(${mobileSize}px, ${baseSize * 0.05}vw + ${mobileSize * 0.7}px, ${baseSize}px)`,
					backgroundColor: 'var(--circles-light)'
				}}
			>
				<Image
					src={imageSrc}
					alt={altText || `${name}'s profile picture`}
					width={baseSize}
					height={baseSize}
					className="w-full h-full object-cover"
				/>
			</div>			
			<h3 className="mt-1 sm:mt-2 text-center font-medium text-sm sm:text-base">{name}</h3>
		</div>
	);
};

export default CircleHolder;