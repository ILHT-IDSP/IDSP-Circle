import {IFormDataProps} from "../register_types";
import FullnameInput from "./fullname_input";
import NextButton from "../next_button";

export default function EnterFullname({formData, setFormData, onNext}: IFormDataProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        const fullName = value;
        const fullAlias = value.split(" ");
        const firstName = fullAlias[0];
        const lastName = fullAlias[1];

        setFormData({...formData, fullName, firstName, lastName});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext();
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <FullnameInput
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <NextButton />
            </form>
        </>
    );
}
