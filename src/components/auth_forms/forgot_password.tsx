'use client';

interface ForgotPasswordProps {
    onForgotPasswordClick?: () => void;
}

export function ForgotPassword({ onForgotPasswordClick }: ForgotPasswordProps = {}) {
    return (
        <div
            id="forgotten-password-container"
            className="inline-block"
        >
            <a 
                href="/reset-password" 
                className="text-blue-500 hover:text-blue-700 underline transition-colors"
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
