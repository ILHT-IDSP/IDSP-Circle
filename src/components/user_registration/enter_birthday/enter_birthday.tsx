import { useState } from 'react';
import { IFormDataProps, IFormData } from '../register_types';
import RegisterBirthdayInput from './birthday_input';

export default function EnterBirthday({ formData, setFormData, onNext }: IFormDataProps) {
	const [isValid, setIsValid] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev: IFormData) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isValid) onNext();
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className=''
			>
				<div className='flex flex-col'>
					<RegisterBirthdayInput
						onChange={handleChange}
						value={formData.birthday}
						onValidityChange={setIsValid}
					/>
				</div>

				<footer className='absolute w-full bottom-16'>
					<button
						type='submit'
						className={`bg-blue-800 text-2xl text-white text-center rounded-full p-3 m-au w-full max-w-full transition-colors ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={!isValid}
					>
						Next
					</button>
				</footer>
			</form>
		</>
	);
}
