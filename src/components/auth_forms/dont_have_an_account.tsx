import Link from 'next/link';

export function DontHaveAnAccountSignUp() {
	return (
		<div>
			<p>
				Don&apos;t have an account?{' '}
				<Link
					className='underline text-blue-500'
					href='/auth/register'
				>
					Sign Up
				</Link>
			</p>
		</div>
	);
}
