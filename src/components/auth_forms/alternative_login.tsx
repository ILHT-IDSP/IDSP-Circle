"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle, faApple} from "@fortawesome/free-brands-svg-icons";

interface AlternativeLoginsProps {
    onGoogleLogin?: () => void;
    onAppleLogin?: () => void;
    onFacebookLogin?: () => void;
}

export function AlternativeLogins({
    onGoogleLogin = () => {},
    onAppleLogin = () => {},
    onFacebookLogin = () => {},
}: AlternativeLoginsProps = {}) {
    return (
        <div
            id="alternative-logins-container"
            className="max-w-full w-full flex items-center justify-center gap-4"
        >            <div
                id="google-auth"
            >
                <a 
                    href="#" 
                    aria-label="Sign in with Google"
                    onClick={(e) => {
                        e.preventDefault();
                        onGoogleLogin();
                    }}
                    className="flex items-center justify-center w-full h-full"
                >                    <FontAwesomeIcon
                        icon={faGoogle}
                		className="border-1 border-black p-2 aspect-square  rounded-full flex items-center justify-center text-2xl"
                        
                    />
                </a>
            </div>            
			<div
                id="apple-auth"
            >
                <a 
                    href="#" 
                    aria-label="Sign in with Apple"
                    onClick={(e) => {
                        e.preventDefault();
                        onAppleLogin();
                    }}
                    className="flex items-center justify-center w-full h-full"
                >                    <FontAwesomeIcon
                        icon={faApple}
                		className="border-1 border-black p-2 aspect-square  rounded-full flex items-center justify-center text-2xl"

                    />
                </a>
            </div>            
			<div
                id="facebook-auth"
            >
                <a 
                    href="#" 
                    aria-label="Sign in with Facebook"
                    onClick={(e) => {
                        e.preventDefault();
                        onFacebookLogin();
                    }}
                    className="flex items-center justify-center w-full h-full"
                >                    <FontAwesomeIcon
                        icon={faFacebookF}
                	className="border-1 border-circles-dark p-2 aspect-square rounded-full flex items-center justify-center text-2xl"
                        
                    />
                </a>
            </div>
        </div>
    );
}
