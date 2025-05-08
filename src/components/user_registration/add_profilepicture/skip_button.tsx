export default function SkipButton({onClick}: {onClick: () => void}) {
    return (
        <>
            <button
                type="button"
                className={`bg-white text-2xl text-gray-500 text-center rounded-full p-2 m-au w-full max-w-full transition-colors`}
                onClick={onClick}
            >
                Skip
            </button>
        </>
    );
}
