import { IInputProps } from '../register_types';
import { useState, useEffect } from 'react';

interface ConfirmPasswordInputProps extends IInputProps {
	originalPassword?: string;
	error?: string | null;
	setError?: (error: string | null) => void;
}

export default function ConfirmPasswordInput({ value, onChange, originalPassword, error, setError }: ConfirmPasswordInputProps) {
	const [isFocused, setIsFocused] = useState(false);

	// Validate password confirmation on change
	useEffect(() => {
		if (!setError) return;

		if (!value) {
			setError(null);
			return;
		}

		if (originalPassword && value !== originalPassword) {
			setError('Passwords do not match');
		} else {
			setError(null);
		}
	}, [value, originalPassword, setError]);

	return (
		<>
			<div>
				<label>
					<p className='font-bold'>Confirm Password</p>
					<div className={`rounded-3xl w-full bg-white flex justify-between border-2 ${error ? 'border-red-500' : 'border-transparent'}`}>
						<input
							type='password'
							placeholder='Confirm Password'
							name='confirmPassword'
							value={value}
							onChange={onChange}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							className='rounded-3xl w-full bg-white text-black placeholder-black indent-2 p-1.5 outline-gray-500 outline-2'
							aria-invalid={!!error}
						/>
					</div>
				</label>
				{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

				{/* Show confirmation status when focused */}
				{isFocused && originalPassword && (
					<div className='mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm'>
						<p className='font-semibold mb-2'>Password confirmation:</p>
						<ul className='list-disc pl-5 space-y-1'>
							<li className={`${value && value === originalPassword ? 'text-green-500' : ''}`}>Passwords must match</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
