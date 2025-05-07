'use client';

import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';

const fakeUser = {
  name: 'adnan',
  username: 'adnan',
  image: '',
  circlesCount: 7,
  friendsCount: 43,
};
export default function ProfileScreen() {
  return (
    <div className="min-h-screen bg-circles-dark px-4 pt-6 pb-20">
      <ProfileHeader user={fakeUser} />
      <ProfileTabs />
    </div>
  );}
