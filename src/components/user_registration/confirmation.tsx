import Image from 'next/image';
import { IFormData } from './register_types';

interface ConfirmationProps {
	formData: IFormData;
	onSubmit: () => Promise<void>;
	loading: boolean;
	success: boolean;
}

export default function Confirmation({ formData, onSubmit, loading, success }: ConfirmationProps) {
	return (
		<div className='flex flex-col items-center'>
			<h1 className='register-headers mb-4'>Confirm Your Details</h1>
			<div className='mb-6 flex flex-col items-center gap-2'>
				<Image
					src={formData.profileImage || '/images/default-avatar.png'}
					width={100}
					height={100}
					alt='Profile'
				/>
				<p>
					<b>Email:</b> {formData.email}
				</p>
				<p>
					<b>Username:</b> {formData.username}
				</p>
				<p>
					<b>Full Name:</b> {formData.fullName}
				</p>
			</div>
			{loading ? (
				<div className='my-4'>Creating your account...</div>
			) : success ? (
				<div className='my-4 text-green-600 font-bold'>Account created! Redirecting...</div>
			) : (
				<button
					type='button'
					className='bg-blue-800 text-2xl text-white text-center rounded-full p-3 m-au w-full max-w-full transition-colors'
					onClick={onSubmit}
				>
					Create Profile
				</button>
			)}
		</div>
	);
}
