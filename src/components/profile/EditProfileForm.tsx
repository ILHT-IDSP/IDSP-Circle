'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
          src={avatar || '/default-avatar.png'}
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
}
