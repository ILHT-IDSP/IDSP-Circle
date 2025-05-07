'use client';

import ProfileHeader from './ProfileHeader';
import EditProfileForm from './EditProfileForm';

const fakeUser = {
    name: 'adnan',
    email: 'adnan@example.com',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fcartoons%2Fcomments%2F17sypd2%2Fwho_is_arguably_the_most_famous_cartoon_character%2F&psig=AOvVaw2MqBuehigzGexl5Rxr3bQD&ust=1746652898415000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjPo6Tjj40DFQAAAAAdAAAAABAE',
  };  

export default function ProfileScreen() {
  return (
    <div className="min-h-screen bg-[#fdf8f4] px-4 pt-6 pb-20">
      <ProfileHeader user={fakeUser} />
      <EditProfileForm user={fakeUser} />
    </div>
  );
}
