import Image from 'next/image';

interface MusicCardProps {
	title: string;
	artist: string;
	length: number;
	image: string;
	explicit?: boolean;
}

const MusicCard: React.FC<MusicCardProps> = ({ title, artist, length, image, explicit = false }) => {
	// Format the song length from seconds to mm:ss format
	const formatLength = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	};

	return (
		<div className='flex items-center p-3 rounded-md bg-background text-foreground border border-foreground/10 hover:border-primary/30 transition-all'>
			<div className='relative h-16 w-16 flex-shrink-0'>
				<Image
					src={image}
					alt={`${title} by ${artist} album cover`}
					fill
					className='object-cover rounded-lg'
				/>
			</div>

			<div className='ml-4 flex flex-col justify-center flex-grow overflow-hidden'>
				{' '}
				<div className='flex items-center'>
					<h3 className='font-bold text-base truncate'>{title}</h3>
					{explicit && (
						<div className='relative h-4 w-4 ml-1 flex-shrink-0'>
							<Image
								src={'/explicit-icon.svg'}
								alt='explicit icon'
								width={16}
								height={16}
							/>
						</div>
					)}
				</div>
				<div className='flex items-center text-sm text-foreground/80'>
					<span className='truncate'>{artist}</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='3'
						height='4'
						viewBox='0 0 3 4'
						fill='none'
						className='mx-1.5 md:mx-2 flex-shrink-0'
					>
						<path
							d='M3 2C3 2.29667 2.91203 2.58668 2.7472 2.83335C2.58238 3.08003 2.34811 3.27229 2.07402 3.38582C1.79994 3.49935 1.49834 3.52906 1.20736 3.47118C0.916393 3.4133 0.649119 3.27044 0.43934 3.06066C0.229562 2.85088 0.0867006 2.58361 0.0288227 2.29263C-0.0290551 2.00166 0.000649929 1.70006 0.114181 1.42597C0.227713 1.15189 0.419972 0.917617 0.666646 0.752795C0.913319 0.587973 1.20333 0.5 1.5 0.5C1.89783 0.5 2.27936 0.658035 2.56066 0.93934C2.84196 1.22064 3 1.60218 3 2Z'
							fill='currentColor'
							className='opacity-70'
						/>
					</svg>
					<span className='flex-shrink-0'>{formatLength(length)}</span>
				</div>
			</div>
		</div>
	);
};

export default MusicCard;
