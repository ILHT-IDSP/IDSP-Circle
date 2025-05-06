export function OrDivider() {
    return (
        <div 
            className="flex justify-center items-center w-full my-2 sm:my-4"
            role="separator"
            aria-orientation="horizontal"
        >            <div 
                className="flex-grow h-[0.5px] bg-foreground/25" 
            ></div>
            <span 
                className="px-2 sm:px-4 text-xs sm:text-sm text-foreground/60"
            >OR</span>
            <div 
                className="flex-grow h-[0.5px] bg-foreground/25" 
            ></div>
        </div>
    );
}
