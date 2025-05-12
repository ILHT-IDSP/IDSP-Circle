interface LoginButtonProps {
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export function LoginButton({isLoading = false, disabled = false}: LoginButtonProps = {}) {
    return (
        <button
            className={`text-lg sm:text-xl md:text-2xl text-center rounded-full p-2 sm:p-3 w-full max-w-full m-auto transition-all font-semibold !bg-[#0044cc] dark:!bg-[#689bff] !text-white shadow-md hover:shadow-lg ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:!bg-[#1a5be0] dark:hover:!bg-[#83afff]"
            }`}
            type="submit"
            disabled={disabled || isLoading}
            aria-busy={isLoading}
        >
            {isLoading ? "Logging in..." : "Log in"}
        </button>
    );
}
