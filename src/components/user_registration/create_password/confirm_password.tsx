import { IInputProps } from '../register_types';

export default function ConfirmPasswordInput({ value, onChange }: IInputProps) {
	return (
		<>
			<div>
				<label>
					<p className='font-bold'>Confirm Password</p>
					<div className='rounded-3xl w-full bg-white flex justify-between'>
						<input
							type='password'
							placeholder='Password'
							name='confirmPassword'
							value={value}
							onChange={onChange}
							className='rounded-3xl w-full bg-white text-black placeholder-black indent-2 p-1.5 outline-gray-500 outline-2'
						/>
					</div>
				</label>
			</div>
		</>
	);
}
