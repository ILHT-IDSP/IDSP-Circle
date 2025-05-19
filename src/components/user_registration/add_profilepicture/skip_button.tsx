interface SkipButtonProps {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SkipButton({ onClick }: SkipButtonProps) {
	return (
		<>
			<footer className='absolute w-full bottom-16'>
				{' '}
				<button
					type='button'
					className={`bg-white dark:bg-gray-800 text-2xl text-gray-500 dark:text-gray-400 text-center rounded-full p-3 m-au w-full max-w-full transition-colors border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700`}
					onClick={onClick}
				>
					Skip
				</button>
			</footer>
		</>
	);
}
