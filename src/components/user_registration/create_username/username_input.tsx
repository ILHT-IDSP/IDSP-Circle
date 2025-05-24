import { IInputProps } from '../register_types';
import { useState, useEffect } from 'react';

interface UsernameInputProps extends IInputProps {
	error?: string | null;
	setError?: (error: string | null) => void;
}

export default function UsernameInput({ value, onChange, error, setError }: UsernameInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isValidating, setIsValidating] = useState(false);
	// Validate username on every change
	useEffect(() => {
		if (!setError) return;

		const validateUsername = async () => {
			if (!value) {
				setError(null);
				return;
			}

			const lowercaseValue = value.toLowerCase();

			// Check length
			if (lowercaseValue.length < 3) {
				setError('Username must be at least 3 characters long');
				return;
			}

			if (lowercaseValue.length > 20) {
				setError('Username must be at most 20 characters long');
				return;
			} // Check for valid characters (letters, numbers, underscores, hyphens)
			if (!/^[a-z0-9_-]+$/.test(lowercaseValue)) {
				setError('Username can only contain lowercase letters, numbers, underscores (_) and hyphens (-)');
				return;
			}

			// Check if username starts with a letter
			if (!/^[a-z]/.test(lowercaseValue)) {
				setError('Username must start with a lowercase letter');
				return;
			}

			// Check if username ends with hyphen or underscore
			if (lowercaseValue.endsWith('-') || lowercaseValue.endsWith('_')) {
				setError('Username cannot end with a hyphen or underscore');
				return;
			}

			// Check for availability
			setIsValidating(true);
			try {
				const response = await fetch('/api/validate', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ field: 'username', value: lowercaseValue }),
				});

				const data = await response.json();
				if (!data.available) {
					setError(data.message);
				} else {
					setError(null);
				}
			} catch (error) {
				console.error('Username validation error:', error);
				setError('Unable to validate username. Please try again.');
			} finally {
				setIsValidating(false);
			}
		};

		const debounceTimer = setTimeout(validateUsername, 500);
		return () => clearTimeout(debounceTimer);
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
					{isValidating && (
						<div className='flex items-center pr-3'>
							<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900'></div>
						</div>
					)}
				</div>
				{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

				{/* Show requirements when input is focused or has an error */}
				{(isFocused || error) && (
					<div className='mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm'>
						<p className='font-semibold mb-2'>Username requirements:</p>{' '}
						<ul className='list-disc pl-5 space-y-1'>
							<li className={`${value && value.length >= 3 ? 'text-green-500' : ''}`}>At least 3 characters long</li>
							<li className={`${value && value.length <= 20 ? 'text-green-500' : ''}`}>Maximum 20 characters</li>
							<li className={`${value && /^[a-z]/.test(value) ? 'text-green-500' : ''}`}>Must start with a lowercase letter</li>
							<li className={`${value && /^[a-z0-9_-]+$/.test(value) ? 'text-green-500' : ''}`}>Can only contain lowercase letters, numbers, underscores (_) and hyphens (-)</li>
							<li className={`${value && !value.endsWith('-') && !value.endsWith('_') ? 'text-green-500' : ''}`}>Cannot end with a hyphen (-) or underscore (_)</li>
							<li className='text-gray-600'>Must be unique (not already taken)</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
