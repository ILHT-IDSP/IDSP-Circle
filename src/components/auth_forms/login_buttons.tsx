interface LoginButtonProps {
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export function LoginButton({ 
    onClick, 
    isLoading = false, 
    disabled = false 
}: LoginButtonProps = {}) {    return (
        <button
            className={`text-lg sm:text-xl md:text-2xl text-center rounded-full p-2 sm:p-3 w-full max-w-full m-auto transition-colors ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            style={{ 
                backgroundColor: 'var(--circles-dark-blue)', 
                color: 'var(--circles-light)' 
            }}
            onClick={onClick}
            type="submit"
            disabled={disabled || isLoading}
            aria-busy={isLoading}
        >
            {isLoading ? 'Logging in...' : 'Log in'}
        </button>
    );
}
