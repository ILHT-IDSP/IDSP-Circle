import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faApple} from "@fortawesome/free-brands-svg-icons";

export function AlternativeLogins() {
    return (
        <div
            id="alternative-logins-container"
            className="max-w-full w-full flex items-center justify-center gap-4"
        >
            <div
                id="google-auth"
                className="border-2 border-white p-8 w-25 h-25 rounded-full"
            >
                <a href="">
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="max-w-full w-15 text-2xl"
                    />
                </a>
            </div>
            <div
                id="apple-auth"
                className="border-2 border-white p-8 pt-6 w-25 h-25 rounded-full"
            >
                <a href="">
                    <FontAwesomeIcon
                        icon={faApple}
                        className="max-w-full w-15"
                    />
                </a>
            </div>
            <div
                id="facebook-auth"
                className="border-2 border-white p-9.5 pt-8 w-25 h-25 rounded-full"
            >
                <a href="">
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        className="text-1xl"
                    />
                </a>
            </div>
        </div>
    );
}
