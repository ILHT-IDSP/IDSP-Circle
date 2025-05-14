'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import RegisterEmailDescription from '@/components/user_registration/enter_email/email_description';
import RegisterEmailHeader from '@/components/user_registration/enter_email/email_header';
import { BackButton } from '@/components/user_registration/back_button';
import EnterEmail from '@/components/user_registration/enter_email/enter_email';
import { RegisterPasswordHeader } from '@/components/user_registration/create_password/password_header';
import RegisterPasswordDescription from '@/components/user_registration/create_password/password_description';
import CreatePassword from '@/components/user_registration/create_password/create_password';
import RegisterFullnameHeader from '@/components/user_registration/enter_fullname/fullname_header';
import RegisterFullnameDescription from '@/components/user_registration/enter_fullname/fullname_description';
import EnterFullname from '@/components/user_registration/enter_fullname/enter_fullname';
import RegisterUsernameDescription from '@/components/user_registration/create_username/username_description';
import RegisterUsernameHeader from '@/components/user_registration/create_username/username_header';
import CreateUsername from '@/components/user_registration/create_username/create_username';
import AddProfilePicture from '@/components/user_registration/add_profilepicture/add_profilepicture';
import Confirmation from '@/components/user_registration/confirmation';

export default function Register() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
		fullName: '',
		firstName: '',
		lastName: '',
		username: '',
		profileImage: '',
	});

	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleBack = () => {
		if (step === 1) {
			router.push('/auth/login');
			return;
		}

		setStep(prev => prev - 1);
	};

	const handleRegisterEmail = () => {
		console.log(`STEP: 1 ${formData.email}`);
		console.log(`STEP ${formData.confirmEmail}`);

		if (formData.email.length === 0 || formData.confirmEmail.length === 0) {
			throw new Error('Must enter an email');
		}

		if (formData.email !== formData.confirmEmail) {
			throw new Error('Emails do not match!');
		}

		if (step === 1 && formData.email === formData.confirmEmail) {
			setStep(prev => prev + 1);
		}
	};

	const handleRegisterPassword = () => {
		console.log('STEP 2', formData.password);
		console.log('STEP 2', formData.confirmPassword);

		if (step !== 2) {
			router.push('/auth/login');
		}

		if (formData.password.length === 0 || formData.password.length === 0) {
			throw new Error('Must enter a password');
		}

		if (formData.password !== formData.confirmPassword) {
			throw new Error('Passwords do not match');
		}

		if (step === 2 && formData.password === formData.confirmPassword) {
			setStep(prev => prev + 1);
		}
	};

	const handleRegisterFullname = () => {
		console.log('STEP 4', formData.fullName);
		console.log('STEP 4', formData.firstName);
		console.log('STEP 4', formData.lastName);

		if (!formData.fullName) {
			throw new Error('Enter your full name');
		}

		if (formData.fullName.includes('123456789')) {
			throw new Error('Alphabetical characters only');
		}

		if (step === 3) return setStep(prev => prev + 1);
	};

	const handleCreateUsername = () => {
		console.log('STEP 5 ', formData.username);
		if (formData.username.length <= 0 || !formData.username) throw new Error('Enter a username');
		if (step === 4 && formData.username) return setStep(prev => prev + 1);
	};

	const handleUploadProfileImage = () => {
		setStep(prev => prev + 1);
	};

	const handleCreateProfile = async () => {
		setLoading(true);
		setSuccess(false);
		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ formData }),
			});
			if (response.ok) {
				setSuccess(true);
				setTimeout(() => router.push('/auth/login'), 2000);
			} else {
				setSuccess(false);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			id='register-page-wrapper'
			className='mx-6 relative h-screen'
		>
			<div
				id='previous-page'
				className='mt-10 mb-15 text-2xl'
			>
				<BackButton handleBack={handleBack} />
			</div>
			{step === 1 && (
				<>
					<div
						id='step-one'
						className='h-full'
					>
						<div className='mb-20'>
							<RegisterEmailHeader />
							<RegisterEmailDescription />
						</div>
						<EnterEmail
							formData={formData}
							setFormData={setFormData}
							onNext={handleRegisterEmail}
						/>
					</div>
				</>
			)}
			{step === 2 && (
				<>
					<div id='step-two'>
						<div className='mb-20'>
							<RegisterPasswordHeader />
							<RegisterPasswordDescription />
						</div>
						<CreatePassword
							formData={formData}
							setFormData={setFormData}
							onNext={handleRegisterPassword}
						/>
					</div>
				</>
			)}
			{step === 3 && (
				<div id='step-four'>
					<div className='mb-20'>
						<RegisterFullnameHeader />
						<RegisterFullnameDescription />
					</div>
					<EnterFullname
						formData={formData}
						setFormData={setFormData}
						onNext={handleRegisterFullname}
					/>
				</div>
			)}
			{step === 4 && (
				<div id='step-five'>
					<div className='mb-20'>
						<RegisterUsernameHeader />
						<RegisterUsernameDescription />
					</div>
					<CreateUsername
						formData={formData}
						setFormData={setFormData}
						onNext={handleCreateUsername}
					/>
				</div>
			)}
			{step === 5 && (
				<div id='step-six'>
					<div className='mb-20'>
						<h1 className='register-headers'>Add a profile picture</h1>
						<div
							className='register-descriptions'
							id='register-profileimage-descriptions'
						>
							<p>Add a profile picture so your friends know it&apos;s you. Everyone will be able to see your picture</p>
						</div>
					</div>
					<AddProfilePicture
						formData={formData}
						setFormData={setFormData}
						onNext={handleUploadProfileImage}
					/>
				</div>
			)}
			{step === 6 && (
				<Confirmation
					formData={formData}
					onSubmit={handleCreateProfile}
					loading={loading}
					success={success}
				/>
			)}
		</div>
	);
}
