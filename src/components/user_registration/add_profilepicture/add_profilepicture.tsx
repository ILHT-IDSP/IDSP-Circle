import {IFormDataProps, IFormData} from "../register_types";
import AddPictureButton from "./add_picture_button";
import SkipButton from "./skip_button";
import {useRouter} from "next/navigation";

export default function AddProfilePicture({formData, setFormData, onNext}: IFormDataProps) {
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({...prev, profileImage: file.name}));
        }
    };

    const handleSkip = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({formData}),
        });

        if (response.ok) {
            console.log("User created!");
            router.push("/auth/login");
        } else {
            console.error("Failure to create user");
        }
    };

    return (
        <>
            <div className="">
                <div
                    className="flex flex-col"
                    id="profile-picture-container"
                >
                    {/* default pfp goes here */}
                    <img
                        src=""
                        alt="poopfilepeekchur"
                    />
                </div>

                <AddPictureButton />
                <SkipButton onClick={handleSkip} />
            </div>
        </>
    );
}
