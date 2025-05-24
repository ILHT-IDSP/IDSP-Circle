import { IInputProps } from '../register_types';
import { useState, useEffect } from 'react';

interface ConfirmEmailInputProps extends IInputProps {
	originalEmail: string;
	error?: string | null;
	setError?: (error: string | null) => void;
}

export function ConfirmEmailInput({ value, onChange, originalEmail, error, setError }: ConfirmEmailInputProps) {
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (!setError) return;

		if (!value) {
			setError(null);
			return;
		}

		if (value !== originalEmail) {
			setError('Emails do not match');
		} else {
			setError(null);
		}
	}, [value, originalEmail, setError]);

	return (
		<>
			<div className=''>
				<label>
					<p className='font-bold'>Confirm Email</p>
					<div className={`rounded-3xl w-full bg-white flex justify-between border-2 ${error ? 'border-red-500' : 'border-transparent'}`}>
						<input
							type='email'
							placeholder='Confirm Email'
							name='confirmEmail'
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
			</div>
		</>
	);
}
