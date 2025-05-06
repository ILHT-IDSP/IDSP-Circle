"use client";
import {AwesomeIcon} from "../../../public/icons";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
export function ToggleShowPassword({inputId}: {inputId: string}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => {
            const newShowPassword = !prev;
            const inputElement = document.getElementById(inputId) as HTMLInputElement;
            if (inputElement) {
                inputElement.type = newShowPassword ? "text" : "password";
            }
            return newShowPassword;
        });
    };    return (
        <>
            <button
                type="button"
                onClick={togglePasswordVisibility}                className="mr-2 sm:mr-4 text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                <AwesomeIcon 
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-sm sm:text-base" 
                />
            </button>
        </>
    );
}
