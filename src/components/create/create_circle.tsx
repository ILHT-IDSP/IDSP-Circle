"use client";
import CreateCircleTopBar from "@/components/create/circle/top_bar";
import {useState} from "react";
import CreateCircleStepOne from "./circle/step_one";
import CircleAvatar from "./circle/circle_avatar";
import {ICircleFormData} from "./circle/circle_types";
import {useRouter} from "next/navigation";
import CreateCircleStepTwo from "./circle/step_two";
import CreateCircleStepThree from "./circle/step_three";
export default function CreateCircle() {
    const router = useRouter();
    const [formData, setFormData] = useState<ICircleFormData>({
        avatar: "",
        name: "",
        isPrivate: true,
        members: "",
    });

    const [step, setStep] = useState(1);

    const handleStepOne = () => {
        console.log("STEP 1: ", formData);
        if (formData.name.trim() !== "") {
            setStep((prev) => prev + 1);
        }
    };

    const handleStepTwo = () => {
        // logic to sort out friends/users ids or names
        // put it into a format that the db can read
    };

    const handleBack = () => {
        if (step === 1) {
            router.push("/profile");
            return;
        }

        setStep((prev) => prev - 1);
    };

    const handleNext = () => {
        if (step === 1) return handleStepOne();
        if (step === 2) setStep((prev) => prev + 1);
    };

    return (
        <>
            <div id="create-circle-wrapper h-full max-h-full w-full max-w-full">
                <CreateCircleTopBar
                    onClick={handleNext}
                    onClickTwo={handleBack}
                    step={step}
                />

                {step === 2 ? <></> : <CircleAvatar />}

                {step === 1 && (
                    <CreateCircleStepOne
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}

                {step === 2 && (
                    <CreateCircleStepTwo
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}

                {step === 3 && (
                    <CreateCircleStepThree
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
            </div>
        </>
    );
}
