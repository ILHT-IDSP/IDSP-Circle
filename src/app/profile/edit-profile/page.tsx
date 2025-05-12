import EditProfileForm from '@/components/profile/EditProfileForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function EditProfilePage() {
  const session = await auth();
  if (!session) {
    redirect('/auth/login');
  }
//   const sessionUser = {
// 	name: session.user.username,
// 	email: session.user.email,
// 	image: session.user.profileImage,
// }

  return (
    <div className="min-h-screen bg-circles-light px-4 pt-6 pb-20">
      <h1 className="text-2xl font-bold text-circles-dark-blue mb-6">Edit Profile</h1>
      <EditProfileForm session={session} />
    </div>
  );
}