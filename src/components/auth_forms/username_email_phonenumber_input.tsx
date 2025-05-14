'use client';
import { useState } from 'react';

interface UsernameEmailOrPhoneNumberLoginInputProps {
	onChange?: (value: string) => void;
}

export function UsernameEmailOrPhoneNumberLoginInput({ onChange }: UsernameEmailOrPhoneNumberLoginInputProps = {}) {
	const [value, setValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		onChange?.(e.target.value);
	};
	return (
		<>
			<div className='p-1 sm:p-2'>
				<div
					id='login-username-input'
					className='rounded-3xl w-full bg-white flex justify-between'
				>
					{' '}
					<input
						type='text'
						name='email'
						placeholder='Email'
						value={value}
						onChange={handleChange}
						className='rounded-3xl w-full bg-white text-black placeholder-black indent-2 p-1.5 outline-gray-500 outline-2'
						required
					/>
				</div>
			</div>
		</>
	);
}
