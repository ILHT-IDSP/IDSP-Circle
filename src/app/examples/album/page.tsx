import AlbumCard from '../../../components/album/AlbumCard';
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
							userName='john'
							userProfileImage='/images/profile1.jpg'
						/>
					</div>
					<div className='w-full max-w-[250px] mx-auto'>
						<AlbumCard
							albumImage='/images/profile2.jpg'
							albumName='Travel Adventures'
							userName='sarah'
							userProfileImage='/images/profile2.jpg'
						/>
					</div>
					<div className='w-full max-w-[250px] mx-auto'>
						<AlbumCard
							albumImage='/images/profile3.jpg'
							albumName='Party Moments'
							userName='michael'
							userProfileImage='/images/profile3.jpg'
						/>
					</div>{' '}
				</div>
			</div>
		</div>
	);
}
