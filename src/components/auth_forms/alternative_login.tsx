"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle, faApple} from "@fortawesome/free-brands-svg-icons";

interface AlternativeLoginsProps {
    onGoogleLogin?: () => void;
    onAppleLogin?: () => void;
    onFacebookLogin?: () => void;
}

export function AlternativeLogins({onGoogleLogin = () => {}, onAppleLogin = () => {}, onFacebookLogin = () => {}}: AlternativeLoginsProps = {}) {    return (
        <div
            id="alternative-logins-container"
            className="max-w-full w-full flex items-center justify-center gap-2 sm:gap-4"
        >
            <div id="google-auth">
                <a
                    href="#"
                    aria-label="Sign in with Google"
                    onClick={(e) => {
                        e.preventDefault();
                        onGoogleLogin();
                    }}
                    className="flex items-center justify-center w-full h-full"
                >
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="p-3 sm:p-4 md:p-5 aspect-square rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl"
                        style={{ 
                            border: '1px solid var(--circles-dark)',
                            color: 'var(--circles-dark)'
                        }}
                    />
                </a>
            </div>
            <div id="apple-auth">
                <a
                    href="#"
                    aria-label="Sign in with Apple"
                    onClick={(e) => {
                        e.preventDefault();
                        onAppleLogin();
                    }}
                    className="flex items-center justify-center w-full h-full"
                >
                    <FontAwesomeIcon
                        icon={faApple}
                        className="p-3 sm:p-4 md:p-5 aspect-square rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl"
                        style={{ 
                            border: '1px solid var(--circles-dark)',
                            color: 'var(--circles-dark)'
                        }}
                    />
                </a>
            </div>
            <div id="facebook-auth">
                <a
                    href="#"
                    aria-label="Sign in with Facebook"
                    onClick={(e) => {
                        e.preventDefault();
                        onFacebookLogin();
                    }}
                    className="flex items-center justify-center w-full h-full"
                >
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        className="p-3 sm:p-4 md:p-5 aspect-square rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl"
                        style={{ 
                            border: '1px solid var(--circles-dark)',
                            color: 'var(--circles-dark)'
                        }}
                    />
                </a>
            </div>
        </div>
    );
}
