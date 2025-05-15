'use client';
import React from 'react';

interface IAlbumFormData {
	title: string;
	coverImage: string;
	isPrivate: boolean;
	creatorId: string | undefined;
	circleId: string | null;
}

export default function CreateAlbumStepOne({ formData, setFormData, onSubmit }: { formData: IAlbumFormData; setFormData: React.Dispatch<React.SetStateAction<IAlbumFormData>>; onSubmit: () => void }) {
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='w-full'
			>
				<label className='flex flex-row gap-3 relative border-b border-gray-700 w-full'>
					<input
						type='text'
						name='title'
						value={formData.title}
						onChange={handleTitleChange}
						className='focus:outline-none w-full text-base relative top-1 bg-transparent pb-2'
						placeholder='Give your album a title...'
						autoFocus
					/>
				</label>
				<p className='mt-4 text-sm text-gray-400'>Albums are private by default. You can share photos with specific circles or keep them personal.</p>
				<button
					type='submit'
					hidden
				>
					Submit
				</button>
			</form>
		</>
	);
}
