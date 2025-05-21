'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Member {
	id: number;
	username: string;
	name: string | null;
	profileImage: string | null;
	role: string;
}

export default function CircleMembers({ circleId }: { circleId: number }) {
	const [members, setMembers] = useState<Member[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/circles/${circleId}/members`);

				if (!response.ok) {
					throw new Error('Failed to fetch circle members');
				}

				const data = await response.json();
				// Handle the new response format with 'members' property
				setMembers(data.members || []);
			} catch (err) {
				console.error('Error fetching circle members:', err);
				setError('Could not load members. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchMembers();
	}, [circleId]);

	if (loading) {
		return (
			<div className='px-6 py-4'>
				<h2 className='text-lg font-semibold mb-4'>Members</h2>
				<div className='flex space-x-2 overflow-x-auto py-2'>
					{[...Array(5)].map((_, i) => (
						<div
							key={i}
							className='flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full animate-pulse'
						></div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='px-6 py-4'>
				<h2 className='text-lg font-semibold mb-2'>Members</h2>
				<p className='text-red-500 text-sm'>{error}</p>
			</div>
		);
	}

	return (
		<div className='px-6 py-4'>
			<h2 className='text-lg font-semibold mb-4'>Members • {members.length}</h2>
			<div className='flex space-x-3 overflow-x-auto py-2 pb-4'>
				{members.map(member => (
					<Link
						href={`/${member.username}`}
						key={member.id}
						className='flex-shrink-0'
					>
						<div className='flex flex-col items-center w-16'>
							<div className='relative'>
								<Image
									src={member.profileImage || '/images/default-avatar.png'}
									alt={member.name || member.username}
									width={50}
									height={50}
									className='w-12 h-12 rounded-full object-cover border-2 border-gray-200'
								/>
								{member.role === 'ADMIN' && (
									<span className='absolute -bottom-1 -right-1 bg-circles-dark-blue rounded-full p-1'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='10'
											height='10'
											fill='white'
											viewBox='0 0 16 16'
										>
											<path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.97 4.97a.75.75 0 0 1 1.08 1.04l-5.5 6.94a.75.75 0 0 1-1.07.09l-3-2.5a.75.75 0 1 1 .96-1.16L6 10.44l4.97-5.47z' />
										</svg>
									</span>
								)}
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
