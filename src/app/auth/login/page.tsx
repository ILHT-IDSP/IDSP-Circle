import {LoginForm} from "@/components/auth_forms/login_form";
import {OrDivider} from "@/components/auth_forms/or_divider";
import {AlternativeLogins} from "@/components/auth_forms/alternative_login";

export default function LoginPage() {
    return (
        <>
            <div
                id="login-page-wrapper"
                className="mx-4 pt-5"
            >
                <LoginForm />

                <div
                    id="or-divider"
                    className="mx-4 pt-5"
                >
                    <OrDivider />
                </div>

                <div id="alternative-logins">
                    <AlternativeLogins />
                </div>
            </div>
        </>
    );
}
