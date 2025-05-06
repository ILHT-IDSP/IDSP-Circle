"use client";

import {FormEvent} from "react";
import {LoginButton} from "./login_buttons";
import {UsernameEmailOrPhoneNumberLoginInput} from "./username_email_phonenumber_input";
import {PasswordInput} from "./password_input";
import {RememberMe} from "./remember_user_checkbox";
import {ForgotPassword} from "./forgot_password";
import CirclesLogo from "../Circles_Logo";
import {OrDivider} from "./or_divider";
import {AlternativeLogins} from "./alternative_login";
import {DontHaveAnAccountSignUp} from "./dont_have_an_account";

export function LoginForm() {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // Login form submission logic here
            console.log("Form submitted");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex flex-col items-center pt-20">
            <div className="mb-6">
                <CirclesLogo />
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md"
            >
                <div className="flex flex-col gap-2">
                    <UsernameEmailOrPhoneNumberLoginInput />
                    <PasswordInput />
                </div>

                <div className="flex justify-between items-center my-6">
                    <RememberMe />
                    <ForgotPassword />
                </div>

                <LoginButton onClick={() => {}} />

                <OrDivider />
                <AlternativeLogins />
            </form>
            <div className="pt-25">
                <DontHaveAnAccountSignUp />
            </div>
        </div>
    );
}
