// import {FormEvent} from "react";
import {LoginButton} from "./login_buttons";
import {UsernameEmailOrPhoneNumberLoginInput} from "./username_email_phonenumber_input";
import {PasswordInput} from "./password_input";
import {RememberMe} from "./remember_user_checkbox";
import {ForgotPassword} from "./forgot_password";
import CirclesLogo from "../Circles_Logo";
import {OrDivider} from "./or_divider";
import {AlternativeLogins} from "./alternative_login";
import {DontHaveAnAccountSignUp} from "./dont_have_an_account";
import {signIn} from "@/auth";
// import {signInSchema} from "@/lib/zod";

export function LoginForm() {
    return (
        <div className="flex flex-col items-center pt-20">
            <div className="mb-6">
                <CirclesLogo />
            </div>
            <form
                action={async (formData) => {
                    "use server";
                    try {
                        // Always redirect to /profile after login
                        await signIn("credentials", formData, { callbackUrl: "/profile" });
                    } catch (error) {
                        console.error("An error occurred during login", error);
                    }
                }}
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

                <LoginButton />

                <OrDivider />
                <AlternativeLogins />
            </form>
            <div className="pt-25">
                <DontHaveAnAccountSignUp />
            </div>
        </div>
    );
}
