"use client";
import {AwesomeIcon} from "../../../public/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {ToggleShowPassword} from "./toggle_show_password";

export function PasswordInput() {
    return (
        <>
            <div
                id="login-password-input"
                className="p-2"
            >
                <div className="rounded-3xl w-full bg-white flex justify-between">
                    <input
                        id="password-input"
                        type="Password"
                        placeholder="Password"
                        className="w-full placeholder-black indent-4 p-1.5"
                    />

                    <ToggleShowPassword inputId="password-input" />
                </div>
            </div>
        </>
    );
}
