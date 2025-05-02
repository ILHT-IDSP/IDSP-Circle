import React from 'react';

interface SettingsCategoryProps {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function SettingsCategory({ 
  title, 
  children,
  className = ''
}: SettingsCategoryProps) {
  return (
    <section className={`mb-6 ${className}`}>
      <h2 className="text-lg font-semibold text-purple-400 mb-2">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
  