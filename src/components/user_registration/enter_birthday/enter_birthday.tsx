import {IFormData, IFormDataProps} from "../register_types";
import NextButton from "../next_button";
import RegisterBirthdayInput from "./birthday_input";

export default function EnterBirthday({formData, setFormData, onNext}: IFormDataProps) {
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
                <div className="flex flex-col">
                    <RegisterBirthdayInput
                        onChange={handleChange}
                        value={formData.birthday}
                    />
                </div>

                <NextButton />
            </form>
        </>
    );
}
