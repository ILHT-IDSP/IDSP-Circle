'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

interface User {
  id: number;
  username: string;
  name: string | null;
  profileImage: string | null;
  isInvited?: boolean;
}

interface UserSearchProps {
  onUserSelected: (user: User) => void;
  circleId: number;
}

export default function UserSearch({ onUserSelected, circleId }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return;
    }

    try {
      setIsSearching(true);
      setError(null);

      const response = await fetch(`/api/users/search?term=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search users');
      }

      const data = await response.json();
      const users = data.users || [];
      
      // Check if any users are already invited to this circle
      if (users.length > 0 && circleId) {
        const circleResponse = await fetch(`/api/circles/${circleId}/members`);
        if (circleResponse.ok) {
          const circleData = await circleResponse.json();
          const memberIds = circleData.members?.map(m => m.id) || [];
          const invitedIds = circleData.invites?.map(i => i.userId) || [];
          
          // Mark users who are already members or invited
          const processedUsers = users.map(user => ({
            ...user,
            isMember: memberIds.includes(user.id),
            isInvited: invitedIds.includes(user.id)
          }));
          
          // Filter out members since we don't want to show them
          const filteredUsers = processedUsers.filter(user => !user.isMember);
          setSearchResults(filteredUsers);
        } else {
          setSearchResults(users);
        }
      } else {
        setSearchResults(users);
      }
    } catch (err) {
      console.error('Error searching users:', err);
      setError('Failed to search for users');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="mb-6">
      <div className="relative flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by username..."
          className="w-full pl-4 pr-12 py-2 rounded-full bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 h-8 w-8 flex items-center justify-center rounded-full bg-[var(--primary)] text-white"
          disabled={isSearching}
        >
          <FaSearch />
        </button>
      </div>

      {isSearching && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[var(--primary)]"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {searchResults.map((user) => (
          <div 
            key={user.id}
            className="flex items-center justify-between p-2 hover:bg-[var(--background-secondary)] rounded-lg"
          >
            <div className="flex items-center">
              <Image
                src={user.profileImage || '/images/default-avatar.png'}
                alt={user.username}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="font-medium">{user.name || user.username}</p>
                <p className="text-sm text-[var(--foreground-secondary)]">@{user.username}</p>
              </div>
            </div>
            
            {user.isInvited ? (
              <span className="text-sm text-gray-400">Already invited</span>
            ) : (
              <button 
                onClick={() => onUserSelected(user)}
                className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg text-sm"
              >
                Invite
              </button>
            )}
          </div>
        ))}

        {searchResults.length === 0 && searchTerm && !isSearching && (
          <p className="text-center text-[var(--foreground-secondary)] py-2">
            No users found matching &quot;{searchTerm}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
