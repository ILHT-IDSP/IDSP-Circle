import {EnterEmailInput} from "./email_input";
import {ConfirmEmailInput} from "./confirm_email";
import {IFormData} from "../register_types";
import NextButton from "../next_button";
import {EnterEmailProps} from "../register_types";

export default function EnterEmail({formData, setFormData, onNext}: EnterEmailProps) {
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
                    <EnterEmailInput
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <ConfirmEmailInput
                        value={formData.confirmEmail}
                        onChange={handleChange}
                    />
                </div>

                <NextButton />
            </form>
        </>
    );
}
