export function OrDivider() {
    return (
        <div 
            className="flex justify-center items-center w-full my-4"
            role="separator"
            aria-orientation="horizontal"
        >
            <div className="flex-grow h-[0.5px] bg-black bg-opacity-25"></div>
            <span className="px-4 text-sm text-gray-600">OR</span>
            <div className="flex-grow h-[0.5px] bg-black bg-opacity-25"></div>
        </div>
    );
}
