
"use client";
import { useState } from "react";

interface RememberMeProps {
    onChange?: (checked: boolean) => void;
}

export function RememberMe({ onChange }: RememberMeProps = {}) {
    const [isChecked, setIsChecked] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        onChange?.(e.target.checked);
    };
    
    return (
        <div className="flex items-center">
            <label htmlFor="remember-me" className="flex items-center cursor-pointer">
                <input 
                    id="remember-me"
                    name="remember-me"
                    type="checkbox" 
                    checked={isChecked}
                    onChange={handleChange}
                    className="mx-1.5 h-4 w-4"
                    aria-label="Remember me"
                />
                <span className="text-sm">Remember Me</span>
            </label>
        </div>
    );
}