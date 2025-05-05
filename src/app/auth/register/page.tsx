import Register from "@/components/user_registration/register";
import NextButton from "@/components/user_registration/next_button";
import RegisterEmailDescription from "@/components/user_registration/enter_email/email_description";
import RegisterEmailHeader from "@/components/user_registration/enter_email/email_header";
import {AwesomeIcon} from "../../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
    return (
        <div id="register-page-wrapper">
            <div>
                <AwesomeIcon
                    icon={faArrowLeft}
                    className="aspect-square text-2xl"
                />
            </div>
            <header>
                <RegisterEmailHeader />
                <div id="register-description">
                    <RegisterEmailDescription />
                </div>
            </header>
            <main></main>
            <footer>
                <div className="mx-5">
                    <NextButton />
                </div>
            </footer>
        </div>
    );
}
