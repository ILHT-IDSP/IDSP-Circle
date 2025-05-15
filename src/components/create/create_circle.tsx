"use client";
import CreateCircleTopBar from "@/components/create/circle/top_bar";
import {useState} from "react";
import {Session} from "next-auth";
import CreateCircleStepOne from "./circle/step_one";
import CircleAvatar from "./circle/circle_avatar";
import {ICircleFormData} from "./circle/circle_types";
import {useRouter} from "next/navigation";
import CreateCircleStepTwo from "./circle/step_two";
import CreateCircleStepThree from "./circle/step_three";
export default function CreateCircle({session}: {session: Session | null}) {
    const router = useRouter();
    const [formData, setFormData] = useState<ICircleFormData>({
        avatar: "",
        name: "",
        isPrivate: true,
        members: [session?.user?.id as string],
        creatorId: session?.user?.id as string,
    });

    const [step, setStep] = useState(1);

    const handleStepOne = () => {
        console.log("STEP 1: ", formData);
        if (formData.name.trim() !== "") {
            // setStep((prev) => prev + 1);
            setStep((prev) => prev + 2); // for now until friends feature work
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

    const handleNext = async () => {
        if (step === 1) return handleStepOne();
        if (step === 2) setStep((prev) => prev + 1);

        if (step === 3) {
            // console.log(`sending formdata to server ${formData}`);
            console.log(session?.user?.id);
            console.log("sending formdata to server...", formData);
            const response = await fetch("/api/create/circle", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({formData}),
            });

            const data = await response.json();

            if (!response.ok) throw new Error("Failed to process data in the backend");
            console.log("formData retrieved from the backend: ", data);
        }
    };

    return (
        <>
            <div id="create-circle-wrapper h-full max-h-full w-full max-w-full">
                <CreateCircleTopBar
                    onClick={handleNext}
                    onClickTwo={handleBack}
                    step={step}
                />

                {step === 2 ? (
                    <></>
                ) : (
                    <CircleAvatar
                        avatar={formData.avatar}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}

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
