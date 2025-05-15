"use client";
import {AwesomeIcon} from "../../../../public/icons";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";

export default function CreateAlbumStepOne({setFormData}: {setFormData: (file: File) => void}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(file); //
        }
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center max-w-full w-full h-[80vh]">
                <div>
                    <AwesomeIcon
                        icon={faCloudArrowUp}
                        className="text-3xl mb-6"
                    />
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        // className="hidden"
                        onChange={handleFileChange}
                    />
                    <p className="text-center text-neutral-400 text-sm">
                        drag and drop to <span className="underline">upload </span>
                        <br />
                        PNG, JPEG, JPG
                    </p>
                </div>
            </div>
        </>
    );
}
