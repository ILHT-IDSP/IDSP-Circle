"use client";
import { useState, useEffect } from "react";
import { FaLock, FaBell } from "react-icons/fa";

export default function AlbumsPage() {
  const [privacy, setPrivacy] = useState("private");
  const [muteContent, setMuteContent] = useState(false);
  const [muteComments, setMuteComments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user settings on component mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const settings = await response.json();
          setPrivacy(settings.defaultAlbumPrivacy ? 'private' : 'public');
          setMuteContent(settings.muteAlbumContent);
          setMuteComments(settings.muteAlbumComments);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSettings();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Albums</h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-circles-light-blue"></div>
        </div>
      ) : (
        <>
          {/* Privacy*/}
          <div className="bg-zinc-800 p-4 rounded-lg flex items-center mb-4">
            <FaLock className="text-xl mr-3" />
            <span>Privacy</span>
          </div>

      <div className="mb-6">
        <h2 className="text-sm text-gray-300 mb-2">Circle Default Privacy</h2>
        <div className="space-y-2">          <label className="flex items-center justify-between">
            <span>Private (Default)</span>
            <input
              type="radio"
              name="privacy"
              checked={privacy === "private"}
              onChange={() => {
                setPrivacy("private");
                // Save setting to API
                fetch('/api/settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ defaultAlbumPrivacy: true })
                });
              }}
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Public</span>
            <input
              type="radio"
              name="privacy"
              checked={privacy === "public"}
              onChange={() => {
                setPrivacy("public");
                // Save setting to API
                fetch('/api/settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ defaultAlbumPrivacy: false })
                });
              }}
            />
          </label>
        </div>
      </div>

      {/* Notification*/}
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
          />        </div>
      </div>
        </>
      )}
    </div>
  );
}
