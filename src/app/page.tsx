import Image from "next/image";
import {LoginForm} from "@/components/auth_forms/login_form";
import {OrDivider} from "@/components/auth_forms/or_divider";
import {AlternativeLogins} from "@/components/auth_forms/alternative_login";
export default function Home() {
    return (
        <div
            id="burger-wrapper(naldoz-bnranch)"
            className="m-0 p-0 w-full max-w-full"
        >
            <header>
                <h1 className="text-red-800 text-3xl"> NALDOUCHE'S BRANCH </h1>
            </header>

            <section id="naldoz-branch">
                <h2>Components</h2>
                <div>
                    <h2>Login/Register Components</h2>

                    <div className="w-full max-w-md mx-auto p-4">
                        <LoginForm />
                    </div>

                    <div>
                        <OrDivider />
                    </div>

                    <div>
                        <AlternativeLogins />
                    </div>
                </div>
            </section>
        </div>
    );
}
