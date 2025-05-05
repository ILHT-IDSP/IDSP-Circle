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
	return (
		<div className={`flex flex-col items-center ${className}`}>
			<div 
				className="rounded-full overflow-hidden flex items-center justify-center bg-gray-100"
				style={{ width: circleSize, height: circleSize }}
			>
				<Image
					src={imageSrc}
					alt={altText || `${name}'s profile picture`}
					width={circleSize}
					height={circleSize}
					className="w-full h-full object-cover"
				/>
			</div>			
			<h3 className="mt-2 text-center font-medium">{name}</h3>
		</div>
	);
};

export default CircleHolder;