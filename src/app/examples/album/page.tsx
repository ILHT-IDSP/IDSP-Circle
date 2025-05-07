import AlbumCard from '../../../components/album/AlbumCard';
import MusicCard from '../../../components/album/musicCard';
import DemoNavBar from '../../../components/top_nav/DemoNavBar';

export default function AlbumExample() {
	return (
		<div>
			<DemoNavBar />
			<div className='container mx-auto p-4'>
				<h1 className='text-2xl font-bold mb-6'>Album Examples</h1>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					<div className='w-full max-w-[250px] mx-auto'>
						<AlbumCard
							albumImage='/images/profile1.jpg'
							albumName='Summer Memories'
							userProfileImage='/images/profile1.jpg'
						/>
					</div>
					<div className='w-full max-w-[250px] mx-auto'>
						<AlbumCard
							albumImage='/images/profile2.jpg'
							albumName='Travel Adventures'
							userProfileImage='/images/profile2.jpg'
						/>
					</div>
					<div className='w-full max-w-[250px] mx-auto'>
						<AlbumCard
							albumImage='/images/profile3.jpg'
							albumName='Party Moments'
							userProfileImage='/images/profile3.jpg'
						/>
					</div>
				</div>

				<h1 className='text-2xl font-bold my-6'>Music Card Examples</h1>

				<div className='max-w-2xl mx-auto space-y-4'>
					<MusicCard
						title='Bohemian Rhapsody'
						artist='Queen'
						length={354}
						image='/images/profile1.jpg'
						explicit={true}
					/>
					<MusicCard
						title='Dreams'
						artist='Fleetwood Mac'
						length={254}
						image='/images/profile2.jpg'
					/>
					<MusicCard
						title='Shape of You'
						artist='Ed Sheeran'
						length={235}
						image='/images/profile3.jpg'
					/>
				</div>
			</div>
		</div>
	);
}
