"use client";
import { useState } from "react";
import { FaMoon, FaLowVision, FaFont } from "react-icons/fa";

export default function AccessibilityPage() {
  const [mode, setMode] = useState("dark");
  const [contrast, setContrast] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Accessibility</h1>

      {/* Darkmode*/}
      <div className="bg-zinc-800 p-4 rounded-lg flex items-center mb-4">
        <FaMoon className="text-xl mr-3" />
        <span>Dark / Light Mode</span>
      </div>

      <div className="mb-6 space-y-2">
        <label className="flex items-center justify-between">
          <span>Dark Mode (Default)</span>
          <input
            type="radio"
            name="theme"
            checked={mode === "dark"}
            onChange={() => setMode("dark")}
          />
        </label>
        <label className="flex items-center justify-between">
          <span>Light Mode</span>
          <input
            type="radio"
            name="theme"
            checked={mode === "light"}
            onChange={() => setMode("light")}
          />
        </label>
      </div>

      <div className="bg-zinc-800 p-4 rounded-lg flex items-center mb-4">
        <FaLowVision className="text-xl mr-3" />
        <span>Contrast</span>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <span>Increase Contrast</span>
        <input
          type="checkbox"
          className="toggle toggle-sm toggle-primary"
          checked={contrast}
          onChange={() => setContrast(!contrast)}
        />
      </div>

      {/* Fontsize*/}
      <div className="bg-zinc-800 p-4 rounded-lg flex items-center mb-4">
        <FaFont className="text-xl mr-3" />
        <span>Font Size</span>
      </div>

      <div className="space-y-2">
        <label className="flex items-center justify-between">
          <span>Large</span>
          <input
            type="radio"
            name="font"
            checked={fontSize === "large"}
            onChange={() => setFontSize("large")}
          />
        </label>
        <label className="flex items-center justify-between">
          <span>Medium (Default)</span>
          <input
            type="radio"
            name="font"
            checked={fontSize === "medium"}
            onChange={() => setFontSize("medium")}
          />
        </label>
        <label className="flex items-center justify-between">
          <span>Small</span>
          <input
            type="radio"
            name="font"
            checked={fontSize === "small"}
            onChange={() => setFontSize("small")}
          />
        </label>
      </div>
    </div>
  );
}
