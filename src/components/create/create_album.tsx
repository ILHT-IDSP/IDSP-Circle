"use client";
import {auth} from "@/auth";
import {Session} from "next-auth";
import CreateAlbumTopBar from "./album/top_bar";
import {useState} from "react";
import CreateAlbumStepOne from "./album/step_one";
import CreateAlbumStepThree from "./album/step_three";

const now = new Date();

export default function CreateAlbum({session}: {session: Session | null}) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        coverImage: "",
        title: "",
        isPrivate: true,
        creatorId: session?.user?.id,
        circleId: null,
    });

    const [coverImage, setCoverImage] = useState(null);

    return (
        <>
            <div id="create-album-wrapper">
                <CreateAlbumTopBar step={step} />

                {step === 1 && (
                    <CreateAlbumStepOne
                        setFormData={(file: File) => {
                            setFormData((prev) => ({...prev, coverImage: file.name}));
                            // setStep(prev => prev + 1); keep commented until add more photos feature is complete
                            setStep(3);
                        }}
                    />
                )}

                {/* Step 2 requires adding more images */}

                {step === 3 && <CreateAlbumStepThree />}
            </div>
        </>
    );
}
