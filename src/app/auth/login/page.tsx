import { LoginForm } from '@/components/auth_forms/login_form';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import ThemeToggle from '@/components/theme/NewThemeToggle';

export default async function LoginPage() {
	const session = await auth();
	if (session) {
		redirect('/profile');
	}
	return (
		<>
			<div
				id='login-page-wrapper'
				className='mx-4 pt-5'
			>
				<div className='flex justify-end mb-4'>
					<ThemeToggle />
				</div>
				<LoginForm />

				<div
					id='or-divider'
					className='mx-4 pt-5'
				></div>
			</div>
		</>
	);
}
