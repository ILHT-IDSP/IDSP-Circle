import { IInputProps } from '../register_types';
import { useState, useEffect } from 'react';

interface PasswordInputProps extends IInputProps {
	error?: string | null;
	setError?: (error: string | null) => void;
}

export default function PasswordInput({ value, onChange, error, setError }: PasswordInputProps) {
	const [isFocused, setIsFocused] = useState(false);

	// Validate password on change
	useEffect(() => {
		if (!setError) return;

		if (!value) {
			setError(null);
			return;
		}

		// Password validation requirements
		const requirements = [
			{ label: 'At least 8 characters', check: (val: string) => val.length >= 8 },
			{ label: 'At least one lowercase letter', check: (val: string) => /[a-z]/.test(val) },
			{ label: 'At least one uppercase letter', check: (val: string) => /[A-Z]/.test(val) },
			{ label: 'At least one number or special character', check: (val: string) => /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val) },
		];

		// Check all requirements
		const failedRequirements = requirements.filter(req => !req.check(value));

		if (failedRequirements.length > 0) {
			setError(`Password must meet all requirements`);
		} else {
			setError(null);
		}
	}, [value, setError]);

	// Password validation requirements for display
	const requirements = [
		{ label: 'At least 8 characters', check: (val: string) => val.length >= 8 },
		{ label: 'At least one lowercase letter', check: (val: string) => /[a-z]/.test(val) },
		{ label: 'At least one uppercase letter', check: (val: string) => /[A-Z]/.test(val) },
		{ label: 'At least one number or special character', check: (val: string) => /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val) },
	];

	return (
		<>
			<div>
				<label>
					<p className='font-bold'>Password</p>
					<div className={`rounded-3xl w-full bg-white flex justify-between border-2 ${error ? 'border-red-500' : 'border-transparent'}`}>
						<input
							type='password'
							placeholder='Password'
							name='password'
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

				{/* Show requirements when focused or has error */}
				{(isFocused || error) && (
					<div className='mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm'>
						<p className='font-semibold mb-2'>Password requirements:</p>
						<ul className='list-disc pl-5 space-y-1'>
							{requirements.map((req, index) => (
								<li
									key={index}
									className={`${value && req.check(value) ? 'text-green-500' : ''}`}
								>
									{req.label}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
