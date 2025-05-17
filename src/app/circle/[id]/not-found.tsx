import Link from 'next/link';
import NavBar from '@/components/bottom_bar/NavBar';

export default function CircleNotFound() {
	return (
		<>
			<div className='flex flex-col items-center justify-center min-h-screen p-6 text-center'>
				<h1 className='text-3xl font-bold mb-4'>Circle Not Found</h1>
				<p className='mb-8 text-gray-500'>The circle you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
				<Link
					href='/profile'
					className='bg-circles-dark-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
				>
					Back to Profile
				</Link>
			</div>
			<NavBar />
		</>
	);
}
