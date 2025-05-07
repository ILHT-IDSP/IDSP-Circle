export default function SkipButton() {
    return (
        <>
            <footer className="absolute w-full bottom-16">
                <button
                    type="submit"
                    className={`bg-white text-2xl text-gray-500 text-center rounded-full p-3 m-au w-full max-w-full transition-colors border-2`}
                >
                    Next
                </button>
            </footer>
        </>
    );
}
