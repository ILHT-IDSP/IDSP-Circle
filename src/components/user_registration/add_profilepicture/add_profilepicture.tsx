import {IFormDataProps, IFormData} from "../register_types";
import AddPictureButton from "./add_picture_button";
import SkipButton from "./skip_button";

export default function AddProfilePicture({formData, setFormData, onNext}: IFormDataProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({...prev, profileImage: file.name}));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext();
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
                <SkipButton />
            </div>
        </>
    );
}
