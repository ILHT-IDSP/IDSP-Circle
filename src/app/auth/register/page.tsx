"use client";

import {useState} from "react";
import Register from "@/components/user_registration/register";
import NextButton from "@/components/user_registration/next_button";
import RegisterEmailDescription from "@/components/user_registration/enter_email/email_description";
import RegisterEmailHeader from "@/components/user_registration/enter_email/email_header";
import {BackButton} from "@/components/user_registration/back_button";
import EnterEmail from "@/components/user_registration/enter_email/enter_email";
import {AwesomeIcon} from "../../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        birthday: "",
        firstName: "",
        lastName: "",
        username: "",
    });

    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    return (
        <div
            id="register-page-wrapper"
            className="mx-6 relative h-screen"
        >
            <div
                id="previous-page"
                className="mt-10 mb-15 text-2xl"
            >
                <AwesomeIcon icon={faArrowLeft} />
            </div>
            {step === 1 && (
                <>
                    <div
                        id="step-one"
                        className="h-full"
                    >
                        <div className="mb-20">
                            <RegisterEmailHeader />
                            <RegisterEmailDescription />
                        </div>
                        <EnterEmail
                            formData={formData}
                            setFormData={setFormData}
                            onNext={handleNext}
                        />
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                    <div id="step-two">
                        <h2>Not yet implemented bumass</h2>
                    </div>
                </>
            )}
            {step === 3 && (
                <div id="step-three">
                    <h2>Not done bru</h2>
                </div>
            )}
        </div>
    );
}
