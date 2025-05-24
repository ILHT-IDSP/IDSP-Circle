import { IInputProps } from '../register_types';
import { useState, useEffect } from 'react';

interface EmailInputProps extends IInputProps {
	error?: string | null;
	setError?: (error: string | null) => void;
}

export function EnterEmailInput({ value, onChange, error, setError }: EmailInputProps) {
	const [isValidating, setIsValidating] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	// Email validation with debounce
	useEffect(() => {
		if (!setError) return;

		const validateEmail = async () => {
			if (!value) {
				setError(null);
				return;
			}

			// Basic email format validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				setError('Please enter a valid email address');
				return;
			}

			setIsValidating(true);
			try {
				const response = await fetch('/api/validate', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ field: 'email', value }),
				});

				const data = await response.json();
				if (!data.available) {
					setError(data.message);
				} else {
					setError(null);
				}
			} catch (error) {
				console.error('Email validation error:', error);
				setError('Unable to validate email. Please try again.');
			} finally {
				setIsValidating(false);
			}
		};

		const debounceTimer = setTimeout(validateEmail, 500);
		return () => clearTimeout(debounceTimer);
	}, [value, setError]);

	return (
		<>
			<div>
				<label>
					<p className='font-bold'>Email</p>
					<div className={`rounded-3xl w-full bg-white flex justify-between border-2 ${error ? 'border-red-500' : 'border-transparent'}`}>
						<input
							type='email'
							placeholder='Email'
							name='email'
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
				</label>
				{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

				{/* Show email requirements when focused */}
				{isFocused && !error && (
					<div className='mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm'>
						<p className='font-semibold mb-2'>Email requirements:</p>
						<ul className='list-disc pl-5 space-y-1'>
							<li className={`${value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'text-green-500' : ''}`}>Valid email format</li>
							<li className='text-gray-600'>Must not be already registered</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
