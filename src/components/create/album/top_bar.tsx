import { AwesomeIcon } from '../../../../public/icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CreateAlbumTopBar({ onClick, onClickTwo, isSubmitting }: { onClick: () => void; onClickTwo: () => void; isSubmitting?: boolean }) {
	return (
		<>
			<header className='flex items-center justify-between px-4 py-3 w-full pt-6 relative'>
				<button
					className='flex items-center hover:cursor-pointer hover:opacity-70 transition-all'
					onClick={onClickTwo}
					disabled={isSubmitting}
				>
					<AwesomeIcon
						icon={faArrowLeft}
						width={25}
						height={25}
					/>
				</button>
				<span className='text-2xl font-medium'>New Album</span>

				<button
					onClick={onClick}
					disabled={isSubmitting}
					className='font-medium hover:cursor-pointer hover:opacity-70 transition-all'
				>
					{isSubmitting ? 'Creating...' : 'Create'}
				</button>
			</header>
		</>
	);
}
