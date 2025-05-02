"use client";
import { useState } from "react";

interface UsernameEmailOrPhoneNumberLoginInputProps {
    onChange?: (value: string) => void;
}

export function UsernameEmailOrPhoneNumberLoginInput({ onChange }: UsernameEmailOrPhoneNumberLoginInputProps = {}) {
    const [value, setValue] = useState("");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange?.(e.target.value);
    };
    
    return (
        <>
            <div
                id="login-username-input"
                className="p-2"
            >
                <input
                    type="text"
                    name="username"
                    placeholder="Phone number, email, or username"
                    value={value}
                    onChange={handleChange}
                    className="rounded-3xl w-full bg-white placeholder-black indent-4 p-1.5 outline-none"
                    required
                />
            </div>
        </>
    );
}
