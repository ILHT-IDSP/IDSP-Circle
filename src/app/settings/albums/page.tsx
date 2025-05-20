"use client";

import { useState } from "react";
import { FaLock, FaBell } from "react-icons/fa";

export default function AlbumsPage() {
  const [privacy, setPrivacy] = useState("private");
  const [muteContent, setMuteContent] = useState(false);
  const [muteComments, setMuteComments] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Albums</h1>

      {/* Privacy */}
      <div className="bg-zinc-800 p-4 rounded-lg flex items-center mb-4">
        <FaLock className="text-xl mr-3" />
        <span>Privacy</span>
      </div>

      <div className="mb-6">
        <h2 className="text-sm text-gray-300 mb-2">Circle Default Privacy</h2>
        <div className="space-y-2">
          {["private", "public"].map((value) => (
            <label
              key={value}
              className="flex items-center justify-between"
            >
              <span>
                {value === "private"
                  ? "Private (Default)"
                  : "Public"}
              </span>
              <input
                type="radio"
                name="privacy"
                checked={privacy === value}
                onChange={() => setPrivacy(value)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Notificatio*/}
      <div className="bg-zinc-800 p-4 rounded-lg flex items-center mb-4">
        <FaBell className="text-xl mr-3" />
        <span>Notification</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>For New Contents</span>
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-primary"
            checked={muteContent}
            onChange={() => setMuteContent(!muteContent)}
          />
        </div>
        <div className="flex items-center justify-between">
          <span>For New Comments</span>
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-primary"
            checked={muteComments}
            onChange={() => setMuteComments(!muteComments)}
          />
        </div>
      </div>
    </div>
  );
}
