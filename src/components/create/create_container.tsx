'use client';
import { AwesomeIcon } from '../../../public/icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import CreateCircleIcon from './circle_icon';
import CreateAlbumIcon from './album_icon';

export default function CreateContainer({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
	return (
		<>
			{isVisible && (
				<div
					className='fixed inset-0 bg-transparent bg-opacity-90 z-49'
					onClick={onClose}
				></div>
			)}

			<div
				id='create-container'
				className={`fixed bottom-0 bg-[var(--background)] border-t-2 shadow-xl left-0 right-0 max-w-xl rounded-t-2xl w-full mx-auto p-4 z-50 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 h-65`}
			>
				<div className='max-w-full w-full flex justify-end'>
					<AwesomeIcon
						icon={faX}
						className='text-[var(--foreground)] p-3 m-2 text-2xl hover:cursor-pointer hover:opacity-70 transition-all'
						onClick={onClose}
					/>
				</div>
				{/* Add your content here */}

				<ul className='flex flex-row gap-20 justify-center'>
					<li className='hover:scale-105 transition-all'>
						<CreateAlbumIcon />
					</li>
					<li className='hover:scale-105 transition-all'>
						<CreateCircleIcon />
					</li>
				</ul>
			</div>
		</>
	);
}
