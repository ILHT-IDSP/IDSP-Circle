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
        <div className="p-1 sm:p-2">            <div className="rounded-3xl w-full flex justify-between border border-foreground/20">
                <input
                    id={id}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    className="w-full indent-3 sm:indent-4 border-0 outline-none rounded-3xl text-sm sm:text-base"
                    required
                />

                <ToggleShowPassword inputId={id} />
            </div>
        </div>
    );
}
