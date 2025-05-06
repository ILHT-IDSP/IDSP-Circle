"use client";

import { useTheme } from "./ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-foreground text-background transition-colors hover:cursor-pointer"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <FontAwesomeIcon 
        icon={theme === "light" ? faMoon : faSun} 
        className="text-lg text-background" 
      />
    </button>
  );
}
