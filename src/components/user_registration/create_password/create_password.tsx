import {IFormDataProps, IFormData} from "../register_types";
import PasswordInput from "./password_input";
import ConfirmPasswordInput from "./confirm_password";
import NextButton from "../next_button";

export default function CreatePassword({formData, setFormData, onNext}: IFormDataProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev: IFormData) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext();
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className=""
            >
                <div className="flex flex-col gap-9">
                    <PasswordInput
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <ConfirmPasswordInput
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <NextButton />
            </form>
        </>
    );
}
