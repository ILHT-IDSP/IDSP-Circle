import { IInputProps } from '../register_types';
import { useState, useEffect } from 'react';

interface UsernameInputProps extends IInputProps {
	error?: string | null;
	setError?: (error: string | null) => void;
}

export default function UsernameInput({ value, onChange, error, setError }: UsernameInputProps) {
	const [isFocused, setIsFocused] = useState(false);

	// Validate username on every change
	useEffect(() => {
		if (!setError) return;

		if (!value) {
			setError(null);
			return;
		}

		// Check length
		if (value.length < 3) {
			setError('Username must be at least 3 characters long');
			return;
		}

		if (value.length > 20) {
			setError('Username must be at most 20 characters long');
			return;
		}

		// Check for valid characters (letters, numbers, underscores, hyphens)
		if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
			setError('Username can only contain letters, numbers, underscores (_) and hyphens (-)');
			return;
		}

		// Check if username starts with a letter
		if (!/^[a-zA-Z]/.test(value)) {
			setError('Username must start with a letter');
			return;
		}

		// If all checks pass
		setError(null);
	}, [value, setError]);

	return (
		<>
			<div className='mb-4'>
				<label className='block mb-2'>
					<p>Username</p>
				</label>
				<div className={`rounded-3xl w-full bg-white flex justify-between border-2 ${error ? 'border-red-500' : 'border-transparent'}`}>
					<input
						type='text'
						placeholder='Username'
						name='username'
						value={value}
						onChange={onChange}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						className='rounded-3xl w-full bg-white text-black placeholder-black indent-2 p-1.5 outline-gray-500 outline-2'
						aria-invalid={!!error}
					/>
				</div>
				{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

				{/* Show requirements when input is focused or has an error */}
				{(isFocused || error) && (
					<div className='mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm'>
						<p className='font-semibold mb-2'>Username requirements:</p>
						<ul className='list-disc pl-5 space-y-1'>
							<li className={`${value && value.length >= 3 ? 'text-green-500' : ''}`}>At least 3 characters long</li>
							<li className={`${value && value.length <= 20 ? 'text-green-500' : ''}`}>Maximum 20 characters</li>
							<li className={`${value && /^[a-zA-Z]/.test(value) ? 'text-green-500' : ''}`}>Must start with a letter</li>
							<li className={`${value && /^[a-zA-Z0-9_-]+$/.test(value) ? 'text-green-500' : ''}`}>Can only contain letters, numbers, underscores (_) and hyphens (-)</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
