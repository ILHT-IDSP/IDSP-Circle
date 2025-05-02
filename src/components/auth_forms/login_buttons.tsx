interface LoginButtonProps {
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export function LoginButton({ 
    onClick, 
    isLoading = false, 
    disabled = false 
}: LoginButtonProps = {}) {
    return (
        <button
            className={`bg-blue-800 text-2xl text-white text-center rounded-full p-3 w-full max-w-full m-auto transition-colors ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-900'
            }`}
            onClick={onClick}
            type="submit"
            disabled={disabled || isLoading}
            aria-busy={isLoading}
        >
            {isLoading ? 'Logging in...' : 'Log in'}
        </button>
    );
}
