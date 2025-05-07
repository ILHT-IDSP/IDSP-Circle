import {IInputProps} from "../register_types";

export default function FullnameInput({value, onChange}: IInputProps) {
    return (
        <>
            <div>
                <label>
                    <p>Name</p>
                </label>
                <div className="rounded-3xl w-full bg-white flex justify-between">
                    <input
                        type="text"
                        placeholder="First and Last name"
                        name="fullName"
                        value={value}
                        onChange={onChange}
                        className="rounded-3xl w-full bg-white placeholder-black indent-2 p-1.5 outline-gray-500 outline-2"
                    />
                </div>
            </div>
        </>
    );
}
