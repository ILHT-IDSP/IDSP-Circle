interface SkipButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SkipButton({onClick}: SkipButtonProps) {
    return (
        <>
            <footer className="absolute w-full bottom-16">
                <button
                    type="button"
                    className={`bg-white text-2xl text-gray-500 text-center rounded-full p-3 m-au w-full max-w-full transition-colors border-2`}
                    onClick={onClick}
                >
                    Skip
                </button>
            </footer>
        </>
    );
}
