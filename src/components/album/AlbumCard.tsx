import Image from 'next/image';
import { FaHeart, FaComment } from 'react-icons/fa';
import CircleHolder from '../circle_holders';

interface AlbumCardProps {
	albumImage: string;
	albumName: string;
	userProfileImage: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ albumImage, albumName, userProfileImage }) => {
	return (
		<div
			className='relative w-full rounded-lg overflow-hidden'
			style={{ aspectRatio: '2/3' }}
		>
			<div className='relative w-full h-full'>
				<Image
					src={albumImage}
					alt={`${albumName} album cover`}
					fill
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-foreground/30' />

				<div className='absolute top-3 right-3 z-10'>
					<CircleHolder
						imageSrc={userProfileImage}
						circleSize={40}
						showName={false}
					/>
				</div>
				<div className='absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 z-10'>
					<h3 className='black-outline text-sm font-medium'>{albumName}</h3>

					<div className='flex items-center gap-3'>
						<button
							className='black-outline'
							aria-label='Like album'
						>
							<FaHeart className='text-xl' />
						</button>
						<button
							className='black-outline'
							aria-label='Comment on album'
						>
							<FaComment className='text-xl' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlbumCard;
