'use client';

import { LoginButton } from './login_buttons';
import { UsernameEmailOrPhoneNumberLoginInput } from './username_email_phonenumber_input';
import { PasswordInput } from './password_input';
import { RememberMe } from './remember_user_checkbox';
import { ForgotPassword } from './forgot_password';
import CirclesLogo from '../Circles_Logo';
import { OrDivider } from './or_divider';
import { AlternativeLogins } from './alternative_login';
import { DontHaveAnAccountSignUp } from './dont_have_an_account';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const email = (formData.get('email') as string).toLowerCase(); // Convert to lowercase
		const password = formData.get('password') as string;

		try {
			await signIn('credentials', {
				email,
				password,
				redirect: true,
				callbackUrl: '/profile',
			});
		} catch (error) {
			console.error('An error occurred during login', error);
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center pt-20'>
			<div className='mb-6'>
				<CirclesLogo />
			</div>
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-md'
			>
				<div className='flex flex-col gap-2'>
					<UsernameEmailOrPhoneNumberLoginInput />
					<PasswordInput />
				</div>

				<div className='flex justify-between items-center my-6'>
					<RememberMe />
					<ForgotPassword />
				</div>

				<LoginButton
					isLoading={isLoading}
					disabled={isLoading}
				/>

				<OrDivider />
				<AlternativeLogins />
			</form>
			<div className='pt-25'>
				<DontHaveAnAccountSignUp />
			</div>
		</div>
	);
}
