type SettingsCategoryProps = {
    title: string;
    children: React.ReactNode;
  };
  
  export default function SettingsCategory({ title, children }: SettingsCategoryProps) {
    return (
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-purple-400 mb-2">{title}</h2>
        <div className="space-y-2">{children}</div>
      </section>
    );
  }
  