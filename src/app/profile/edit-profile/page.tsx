'use client';

import EditProfileForm from '@/components/profile/EditProfileForm';

const fakeUser = {
  name: 'adnan',
  email: 'adnan@example.com',
  bio: 'Just a simple bio...',
  image: '/default-avatar.png',
};

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-circles-light px-4 pt-6 pb-20">
      <h1 className="text-2xl font-bold text-circles-dark-blue mb-6">Edit Profile</h1>
      <EditProfileForm user={fakeUser} />
    </div>
  );
}
