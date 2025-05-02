import Link from "next/link";
import { ReactNode } from "react";

type SettingsItemProps = {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
};

export default function SettingsItem({ label, icon, href, onClick }: SettingsItemProps) {
  const classes =
    "w-full flex items-center justify-between p-4 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition cursor-pointer";

  const content = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm">{`>`}</span>
    </div>
  );

  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes} onClick={onClick}>
      {content}
    </div>
  );
}
