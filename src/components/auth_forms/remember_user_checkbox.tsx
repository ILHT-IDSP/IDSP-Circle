
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
    
    return (        <div className="flex items-center">
            <label htmlFor="remember-me" className="flex items-center cursor-pointer">
                <input 
                    id="remember-me"
                    name="remember-me"
                    type="checkbox" 
                    checked={isChecked}
                    onChange={handleChange}
                    className="mx-1 sm:mx-1.5 h-3 w-3 sm:h-4 sm:w-4"
                    style={{ accentColor: 'var(--circles-dark-blue)' }}
                    aria-label="Remember me"
                />
                <span className="text-xs sm:text-sm" style={{ color: 'var(--circles-dark)' }}>Remember Me</span>
            </label>
        </div>
    );
}