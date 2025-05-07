import {IInputProps} from "../register_types";

export function ConfirmEmailInput({value, onChange}: IInputProps) {
    return (
        <>
            <div className="">
                <label>
                    <p className="font-bold">Confirm Email</p>
                    <div className="rounded-3xl w-full bg-white flex justify-between">
                        <input
                            type="text"
                            placeholder="Email"
                            name="confirmEmail"
                            value={value}
                            className="rounded-3xl w-full bg-white placeholder-black indent-2 p-1.5 outline-gray-500 outline-2"
                            onChange={onChange}
                        />
                    </div>
                </label>
            </div>
        </>
    );
}
