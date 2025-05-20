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
    const userId: number = Number(session?.user?.id);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ICircleFormData>({
        avatar: "",
        name: "",
        isPrivate: false,
        members: [],
        creatorId: userId,
    });

    const [friends, setFriends] = useState([]);
    const [step, setStep] = useState(1);

    const handleBack = () => {
        if (step === 1) return router.push("/profle");
        setStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        if (formData.name.trim() === "") {
            alert("Please enter a circle name");
            return;
        }

        try {
            setIsSubmitting(true);
            console.log("Sending formdata to server...", formData);

            const response = await fetch("/api/create/circle", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({formData}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create circle");
            }

            console.log("Circle created successfully:", data);

            if (data.circle && data.circle.id) {
                router.push(`/circle/${data.circle.id}`);
            } else {
                router.push("/profile");
            }
        } catch (error) {
            console.error("Error creating circle:", error);
            alert("Failed to create circle. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getFriends = async () => {
        try {
            const response = await fetch("/api/users/friends", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({userId: session?.user?.id}),
            });

            if (!response.ok) throw new Error("Error obtaining friends from server");
            const friends = await response.json();
            console.log("FRIENDS FROM SERVER", friends.data);
            return friends.data;
        } catch (err) {
            console.error("Failure to render add friends step");
            return [];
        }
    };

    const handleNext = async () => {
        console.log(formData);
        console.log("STEP: ", step);
        if (step === 1) {
            const friends = await getFriends();
            setFriends(friends);
            setStep(2);
        }

        if (step === 2) {
            console.log(formData.members);
            setStep(3);
        }

        if (step === 3) {
            handleSubmit();
        }
    };

    return (
        <>
            <div className="flex flex-col h-full w-full">
                <CreateCircleTopBar
                    step={step}
                    onClick={() => {
                        handleNext();
                        // setStep(2);
                    }}
                    onClickTwo={handleBack}
                    // isSubmitting={}
                />

                {step === 1 && (
                    <div className="flex flex-col items-center px-4 mt-6">
                        <CircleAvatar
                            avatar={formData.avatar}
                            setFormData={setFormData}
                        />

                        <div className="w-full mt-6">
                            <CreateCircleStepOne
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <CreateCircleStepTwo
                        friends={friends}
                        setFormData={setFormData}
                        formData={formData}
                    />
                )}

                {step === 3 && (
                    <CreateCircleStepThree
                        formData={formData}
                        setFormData={setFormData}
                        friends={friends}
                        setFriends={setFriends}
                    />
                )}
            </div>
        </>
    );
}
