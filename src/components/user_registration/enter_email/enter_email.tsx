import { EnterEmailInput } from './email_input';
import { ConfirmEmailInput } from './confirm_email';
import { IFormData, IFormDataProps } from '../register_types';
import NextButton from '../next_button';
import { useState } from 'react';

export default function EnterEmail({ formData, setFormData, onNext }: IFormDataProps) {
	const [emailError, setEmailError] = useState<string | null>(null);
	const [confirmEmailError, setConfirmEmailError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		// Convert email to lowercase for consistency
		const processedValue = name === 'email' ? value.toLowerCase() : value;
		setFormData((prev: IFormData) => ({ ...prev, [name]: processedValue }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check for any validation errors
		if (emailError || confirmEmailError) {
			return;
		}

		// Ensure both fields are filled
		if (!formData.email || !formData.confirmEmail) {
			if (!formData.email) setEmailError('Email is required');
			if (!formData.confirmEmail) setConfirmEmailError('Please confirm your email');
			return;
		}

		// Ensure emails match
		if (formData.email !== formData.confirmEmail) {
			setConfirmEmailError('Emails do not match');
			return;
		}

		onNext();
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className=''
			>
				<div className='flex flex-col gap-9'>
					<EnterEmailInput
						value={formData.email}
						onChange={handleChange}
						error={emailError}
						setError={setEmailError}
					/>
					<ConfirmEmailInput
						value={formData.confirmEmail}
						onChange={handleChange}
						originalEmail={formData.email}
						error={confirmEmailError}
						setError={setConfirmEmailError}
					/>
				</div>

				<NextButton />
			</form>
		</>
	);
}
