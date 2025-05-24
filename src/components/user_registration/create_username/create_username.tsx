import NextButton from '../next_button';
import { IFormData, IFormDataProps } from '../register_types';
import UsernameInput from './username_input';
import { useState } from 'react';

export default function CreateUsername({ formData, setFormData, onNext }: IFormDataProps) {
	const [error, setError] = useState<string | null>(null);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		// Only allow valid characters and convert to lowercase
		const sanitizedValue = value.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
		setFormData((prev: IFormData) => ({ ...prev, [name]: sanitizedValue }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check if there's an error before proceeding
		if (error) {
			return;
		}

		// Validate the username one last time
		if (!formData.username) {
			setError('Username is required');
			return;
		}

		if (formData.username.length < 3) {
			setError('Username must be at least 3 characters long');
			return;
		}

		if (formData.username.length > 20) {
			setError('Username must be at most 20 characters long');
			return;
		}
		if (!/^[a-z0-9_-]+$/.test(formData.username)) {
			setError('Username can only contain lowercase letters, numbers, underscores (_) and hyphens (-)');
			return;
		}

		if (!/^[a-z]/.test(formData.username)) {
			setError('Username must start with a lowercase letter');
			return;
		}

		if (/[-_]$/.test(formData.username)) {
			setError('Username cannot end with a hyphen (-) or underscore (_)');
			return;
		}

		// If all checks pass, proceed to next step
		onNext();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<UsernameInput
					value={formData.username}
					onChange={handleChange}
					error={error}
					setError={setError}
				/>
				<NextButton />
			</form>
		</>
	);
}
