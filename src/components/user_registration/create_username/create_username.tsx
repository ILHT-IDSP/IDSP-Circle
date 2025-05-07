import NextButton from "../next_button";
import {IFormData, IFormDataProps} from "../register_types";
import UsernameInput from "./username_input";

export default function CreateUsername({formData, setFormData, onNext}: IFormDataProps) {
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
            <form onSubmit={handleSubmit}>
                <UsernameInput
                    value={formData.username}
                    onChange={handleChange}
                />
                <NextButton />
            </form>
        </>
    );
}
