import {IInputProps} from "../register_types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RegisterBirthdayInput({value, onChange}: IInputProps) {
    const handleDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            onChange({target: {name: "birthday", value: formattedDate}} as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <>
            <div>
                <label>
                    <p className="font-bold">Birthday</p>
                    <div className="rounded-3xl w-full bg-white flex justify-between outline-gray-500 outline-2">
                        <DatePicker
                            name="birthday"
                            selected={value ? new Date(value) : null}
                            dateFormat="MMMM d, yyyy"
                            onChange={handleDateChange}
                            className="rounded-3xl w-full bg-white placeholder-black indent-2 p-1.5 max-w-full"
                            popperClassName="custom-datepicker-popper"
                            popperPlacement="bottom"
                        />
                    </div>
                </label>
            </div>
        </>
    );
}
