import { IFormDataProps, IFormData } from '../register_types';
import PasswordInput from './password_input';
import ConfirmPasswordInput from './confirm_password';
import NextButton from '../next_button';
import { useState } from 'react';

export default function CreatePassword({ formData, setFormData, onNext }: IFormDataProps) {
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev: IFormData) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check if there are any validation errors before proceeding
		if (passwordError || confirmPasswordError) {
			return;
		}

		// Additional validation checks
		if (!formData.password || formData.password.length === 0) {
			setPasswordError('Password is required');
			return;
		}

		if (!formData.confirmPassword || formData.confirmPassword.length === 0) {
			setConfirmPasswordError('Please confirm your password');
			return;
		}

		// If all validations pass, proceed to next step
		onNext();
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className=''
			>
				<div className='flex flex-col gap-9'>
					<PasswordInput
						value={formData.password}
						onChange={handleChange}
						error={passwordError}
						setError={setPasswordError}
					/>
					<ConfirmPasswordInput
						value={formData.confirmPassword}
						onChange={handleChange}
						originalPassword={formData.password}
						error={confirmPasswordError}
						setError={setConfirmPasswordError}
					/>
				</div>

				<NextButton />
			</form>
		</>
	);
}
