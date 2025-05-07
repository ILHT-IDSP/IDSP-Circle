import {IInputProps} from "../register_types";

export default function UsernameInput({value, onChange}: IInputProps) {
    return (
        <>
            <div>
                <label>
                    <p>Username</p>
                </label>
                <div className="rounded-3xl w-full bg-white flex justify-between">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={value}
                        onChange={onChange}
                        className="rounded-3xl w-full bg-white placeholder-black indent-2 p-1.5 outline-gray-500 outline-2"
                    />
                </div>
            </div>
        </>
    );
}
