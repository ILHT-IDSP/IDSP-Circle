'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { useState } from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface CircleDetails {
  id: number;
  name: string;
  avatar: string | null;
  description: string | null;
  isPrivate: boolean;
  createdAt: string;
  membersCount: number;
  isCreator: boolean;
  isMember: boolean;
}

export default function CircleHeader({ 
  circle, 
  session 
}: { 
  circle: CircleDetails, 
  session: Session | null 
}) {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleJoinLeaveCircle = async () => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    try {
      setIsJoining(true);
      const action = circle.isMember ? 'leave' : 'join';
      
      const response = await fetch(`/api/circles/${circle.id}/membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} circle`);
      }


      router.refresh();
    } catch (error) {
      console.error(`Error ${circle.isMember ? 'leaving' : 'joining'} circle:`, error);
      alert(`Failed to ${circle.isMember ? 'leave' : 'join'} circle. Please try again.`);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={handleBack}
          className="bg-[var(--foreground)] text-[var(--background)] p-2 rounded-full  hover:opacity-70 hover:pointer-curs"
        >
          <FaArrowLeft size={18} />
        </button>
      </div>

      {/* Settings button for circle creator */}
      {circle.isCreator && (
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => router.push(`/circle/${circle.id}/settings`)}
            className="bg-black/30 p-2 rounded-full text-white hover:bg-black/50"
          >
            <FaCog size={18} />
          </button>
        </div>
      )}

      {/* Circle header content */}
      <div className="flex flex-col items-center pt-8 pb-4 px-4">
        <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-circles-dark-blue">
          <Image
            src={circle.avatar || '/images/circles/default.svg'}
            alt={circle.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>

        <h1 className="text-2xl font-bold mb-1">{circle.name}</h1>
        
        {circle.description && (
          <p className="text-sm text-gray-400 text-center mb-3 max-w-md">{circle.description}</p>
        )}

        <div className="flex items-center mb-4">
          <div className="text-sm text-gray-400">
            {circle.isPrivate ? 'Private Circle' : 'Public Circle'} • {circle.membersCount} members
          </div>
        </div>

        {!circle.isCreator && (
          <button
            onClick={handleJoinLeaveCircle}
            disabled={isJoining}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              circle.isMember
                ? 'bg-gray-700 text-white hover:bg-red-700'
                : 'bg-circles-dark-blue text-white hover:bg-blue-700'
            } transition-colors`}
          >
            {isJoining ? 'Processing...' : circle.isMember ? 'Leave Circle' : 'Join Circle'}
          </button>
        )}
      </div>
    </div>
  );
}
