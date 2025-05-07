import {IInputProps} from "../register_types";
export default function PasswordInput({value, onChange}: IInputProps) {
    return (
        <>
            <div>
                <label>
                    <p className="font-bold">Password</p>
                    <div className="rounded-3xl w-full bg-white flex justify-between">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={value}
                            onChange={onChange}
                            className="rounded-3xl w-full bg-white placeholder-black indent-2 p-1.5 outline-gray-500 outline-2"
                        />
                    </div>
                </label>
            </div>
        </>
    );
}
