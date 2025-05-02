import {LoginButton} from "./login_buttons";
import {UsernameEmailOrPhoneNumberLoginInput} from "./username_email_phonenumber_input";
import {PasswordInput} from "./password_input";
import {RememberMe} from "./remember_user_checkbox";
import {ForgotPassword} from "./forgot_password";
import {LOGO} from "../Circles_Logo";

export function LoginForm() {
    return (
        <>
            <div
                id="login-form"
                className="flex flex-col items-center"
            >
                <div
                    id="login-circle-logo"
                    className=""
                >
                    <LOGO />
                </div>
                <form
                    action=""
                    method="POST"
                >
                    <div className="flex flex-col gap-2">
                        <UsernameEmailOrPhoneNumberLoginInput />
                        <PasswordInput />
                    </div>

                    <div
                        id="login-options"
                        className="flex justify-between items-center m-auto my-6"
                    >
                        <RememberMe />
                        <ForgotPassword />
                    </div>

                    <LoginButton />
                </form>
            </div>
        </>
    );
}
