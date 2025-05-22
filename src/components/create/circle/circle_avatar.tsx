import Image from "next/image";
import {useRef, useState} from "react";
import {ICircleFormData} from "./circle_types";
import ImageUploadCropper from "../../common/ImageUploadCropper";

interface CircleAvatarProps {
    avatar: string;
    setFormData: React.Dispatch<React.SetStateAction<ICircleFormData>>;
}

export default function CircleAvatar({avatar, setFormData}: CircleAvatarProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const cropperRef = useRef<HTMLDivElement>(null);

    const handleAvatarClick = () => {
        // Find the hidden input inside the ImageUploadCropper and click it

        const input = cropperRef.current?.querySelector("input");
        if (input) {
            input.click();
        }
    };

    const handleUploadStart = () => {
        setIsLoading(true);
        setError(null);
    };

    const handleUploadComplete = (imageUrl: string) => {
        setFormData((prev) => ({
            ...prev,
            avatar: imageUrl,
        }));
        setIsLoading(false);
    };

    const handleUploadError = (errorMessage: string) => {
        setError(errorMessage);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative cursor-pointer">
                <div
                    className="relative"
                    ref={cropperRef}
                >
                    <Image
                        onClick={handleAvatarClick}
                        src={avatar || "/images/default-avatar.png"}
                        alt="Circle Avatar"
                        width={200}
                        height={200}
                        className="my-8 rounded-full object-cover border-4 border-circles-dark-blue"
                        style={{aspectRatio: "1 / 1"}}
                    />
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    <ImageUploadCropper
                        onUploadStart={handleUploadStart}
                        onUploadComplete={handleUploadComplete}
                        onUploadError={handleUploadError}
                        uploadEndpoint="/api/upload"
                        aspectRatio={1}
                    />
                </div>
            </div>
        </div>
    );
}
