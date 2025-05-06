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
                className="p-1 sm:p-2"
            >
                <input
                    type="text"
                    name="username"
                    placeholder="Phone number, email, or username"
                    value={value}
                    onChange={handleChange}
                    className="rounded-3xl w-full indent-3 sm:indent-4 p-1 sm:p-1.5 outline-none text-sm sm:text-base"
                    style={{ 
                        backgroundColor: 'var(--circles-light)', 
                        color: 'var(--circles-dark)' 
                    }}
                    required
                />
            </div>
        </>
    );
}
