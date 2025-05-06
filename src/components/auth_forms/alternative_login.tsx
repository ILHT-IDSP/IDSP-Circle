"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle, faApple} from "@fortawesome/free-brands-svg-icons";

interface AlternativeLoginsProps {
    onGoogleLogin?: () => void;
    onAppleLogin?: () => void;
    onFacebookLogin?: () => void;
}

export function AlternativeLogins({onGoogleLogin = () => {}, onAppleLogin = () => {}, onFacebookLogin = () => {}}: AlternativeLoginsProps = {}) {    return (        <div className="w-full flex items-center justify-center gap-2 sm:gap-4">
            <div>
                <a
                    href="#"
                    aria-label="Sign in with Google"
                    onClick={(e) => {
                        e.preventDefault();
                        onGoogleLogin();
                    }}
                    className="flex items-center justify-center"
                >
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="p-3 sm:p-4 rounded-full text-xl border border-foreground text"
                    />
                </a>
            </div>            <div>
                <a
                    href="#"
                    aria-label="Sign in with Apple"
                    onClick={(e) => {
                        e.preventDefault();
                        onAppleLogin();
                    }}
                    className="flex items-center justify-center"
                >
                    <FontAwesomeIcon
                        icon={faApple}
                        className="p-3 sm:p-4 rounded-full text-xl border  "
                    />
                </a>
            </div>            <div>
                <a
                    href="#"
                    aria-label="Sign in with Facebook"
                    onClick={(e) => {
                        e.preventDefault();
                        onFacebookLogin();
                    }}
                    className="flex items-center justify-center"
                >
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        className="p-3 sm:p-4 rounded-full text-xl border  "
                    />
                </a>
            </div>
        </div>
    );
}
