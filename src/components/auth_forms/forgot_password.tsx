'use client';

interface ForgotPasswordProps {
    onForgotPasswordClick?: () => void;
}

export function ForgotPassword({ onForgotPasswordClick }: ForgotPasswordProps = {}) {
    return (
        <div
            id="forgotten-password-container"
            className="inline-block"
        >            <a 
                href="/reset-password" 
                className="text-xs sm:text-sm underline transition-opacity hover:opacity-80 text-primary"
                onClick={(e) => {
                    if (onForgotPasswordClick) {
                        e.preventDefault();
                        onForgotPasswordClick();
                    }
                }}
                aria-label="Reset your password"
            >
                Forgot Password?
            </a>
        </div>
    );
}
