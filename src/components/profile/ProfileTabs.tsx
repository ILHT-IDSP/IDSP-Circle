'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Item {
  id: number;
  name: string;
  image: string;
}
const fakeAlbums: Item[] = [
  { id: 1, name: 'year 1', image: '/images/albums/year1.jpeg' },
  { id: 2, name: 'sunsets', image: '/images/albums/sunsets.jpeg' },
  { id: 3, name: 'sleeps', image: '/images/albums/sleeps.jpeg' },
  { id: 4, name: 'night out', image: '/images/albums/nightout.jpeg' },
];
const fakeCircles: Item[] = [
  { id: 1, name: 'groovy girls', image: '/images/circles/groovy-girls.jpg' },
  { id: 2, name: 'work gang', image: '/images/circles/work-gang.jpeg' },
  { id: 3, name: '03 babies', image: '/images/circles/03-babies.jpeg' },
  { id: 4, name: 'altitude & attitudes', image: '/images/circles/altitude-attitudes.png' },
];
export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<'albums' | 'circles'>('albums');
  const items = activeTab === 'albums' ? fakeAlbums : fakeCircles;

  return (
    <div>
      <div className="flex justify-center space-x-8 mb-4">
        <button
          className={`text-lg font-semibold ${activeTab === 'albums' ? 'text-circles-dark-blue' : 'text-circles-light'}`}
          onClick={() => setActiveTab('albums')}>albums</button>
        <button
          className={`text-lg font-semibold ${activeTab === 'circles' ? 'text-circles-dark-blue' : 'text-circles-light'}`}
          onClick={() => setActiveTab('circles')}
        >
          circles
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <Image
              src={item.image}
              alt={item.name}
              width={150}
              height={150}
              className="w-full h-40 rounded-lg object-cover"
            />
            <p className="absolute bottom-2 left-2 text-white font-semibold text-sm bg-circles-dark rounded-md px-2 py-1">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );}
