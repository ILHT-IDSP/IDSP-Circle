'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

<<<<<<< HEAD
import {Session} from "next-auth";
import {useState} from "react";

export default function EditProfileForm({session}: {session: Session | null}) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(session?.user?.username ?? "");
    const [email, setEmail] = useState(session?.user?.email ?? "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify({name, email}),
            headers: {"Content-Type": "application/json"},
        });
        setEditing(false);
        window.location.reload();
    };

    return (
        <div className="mt-6 text-sm text-center">
            <button
                onClick={() => setEditing((prev) => !prev)}
                className="underline text-blue-500"
            >
                {editing ? "Cancel" : "Edit Profile Info"}
            </button>

            {editing && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 space-y-4 max-w-md mx-auto text-sm"
                >
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            className="w-full border px-3 py-2 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            className="w-full border px-3 py-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded w-full"
                    >
                        Save
                    </button>
                </form>
            )}
        </div>
    );
=======
interface User {
  name: string;
  email: string;
  bio: string;
  image: string;
}
export default function EditProfileForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.image);
  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mock API
    console.log("Updated Profile:", { name, email, bio, avatar });

    // back to profile
    router.push('/profile');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 bg-circles-light rounded-2xl shadow-lg">
      {/* Profile Pic*/}
      <label className="relative cursor-pointer mb-4">
        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        <Image
          src={avatar || '/images/default-avatar.png'}
          alt="Profile"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border-4 border-circles-dark-blue"
        />
        <span className="absolute bottom-0 right-0 bg-circles-dark-blue text-circles-light text-xs rounded-full px-2 py-1">Change</span>
      </label>

      {/* Username*/}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
        className="w-full mb-4 p-2 rounded-lg border-2 border-circles-dark-blue"
        required
      />

      {/* Email*/}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-4 p-2 rounded-lg border-2 border-circles-dark-blue"
        required
      />

      {/* Bio*/}
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        rows={3}
        className="w-full mb-4 p-2 rounded-lg border-2 border-circles-dark-blue"
      />

      {/* Save*/}
      <button
        type="submit"
        className="bg-circles-dark-blue text-circles-light font-semibold py-2 px-4 rounded-lg w-full"
      >Save
      </button>

      {/* Cancel */}
      <button
        type="button"
        onClick={() => router.push('/profile')}
        className="mt-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg w-full"
      >Cancel</button>
    </form>
  );
>>>>>>> bd1ef4ae7eada3fa1c0686834797d4ff6f7954af
}
