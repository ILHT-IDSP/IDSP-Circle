"use client";
import {useState} from "react";
import {ToggleShowPassword} from "./toggle_show_password";

interface PasswordInputProps {
    onChange?: (value: string) => void;
    id?: string;
}

export function PasswordInput({onChange, id = "password-input"}: PasswordInputProps = {}) {
    const [password, setPassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        onChange?.(e.target.value);
    };

    return (
        <div className="p-2">
            <div className="rounded-3xl w-full bg-white flex justify-between">
                <input
                    id={id}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    className="rounded-3xl w-full bg-white placeholder-black indent-2 p-1.5 outline-gray-500 outline-2"
                    required
                />

                <ToggleShowPassword inputId={id} />
            </div>
        </div>
    );
}
