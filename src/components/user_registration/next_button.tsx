export default function NextButton() {
    return (
        <>
            <button 
                className={`text-lg sm:text-xl md:text-2xl text-center rounded-full p-2 sm:p-3 w-full max-w-full transition-opacity hover:opacity-90`}
                style={{ 
                    backgroundColor: 'var(--circles-dark-blue)', 
                    color: 'var(--circles-light)' 
                }}
            >
                Next
            </button>
        </>
    );
}
