import Link from 'next/link';
import AlbumSVG from '../album_svg';

export default function CreateAlbumIcon() {
	return (
		<>
			<div className='flex flex-col items-center'>
				<Link
					href={'/create/album'}
					className='flex flex-col items-center gap-2'
				>
					<div
						id='album-icon-container'
						className='bg-[var(--circles-dark-blue)] p-3 flex items-center h-20 w-20 rounded-2xl'
					>
						<div className='filter invert flex m-auto'>
							<AlbumSVG 
								width={45}
								height={45}
							/>
						</div>
					</div>
					<div>
						<p className='text-[var(--foreground)] text-sm'>create album</p>
					</div>
				</Link>
			</div>
		</>
	);
}
