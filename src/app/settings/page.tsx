import SettingsCategory from "@/components/settings_form/SettingsCategory";
import SettingsItem from "@/components/settings_form/SettingsItem";
import { FaBell, FaUserFriends, FaAdjust, FaImages, FaSignOutAlt } from "react-icons/fa";

export default function SettingsPage() {
  return (
    <div className="w-full max-w-2xl mx-auto text-white min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400">@keonaur — keonaasik@gmail.com</p>
      </header>

      <SettingsCategory title="Albums">
        <SettingsItem label="Privacy" icon={<FaImages />} href="/settings/albums" />
        <SettingsItem label="Notification" icon={<FaBell />} href="/settings/albums" />
      </SettingsCategory>

      <SettingsCategory title="Accessibility">
        <SettingsItem label="Dark / Light Mode" icon={<FaAdjust />} href="/settings/accessibility" />
        <SettingsItem label="Contrast" icon={<FaAdjust />} href="/settings/accessibility" />
        <SettingsItem label="Font Size" icon={<FaAdjust />} href="/settings/accessibility" />
      </SettingsCategory>

      <SettingsCategory title="Account">
        <SettingsItem label="Friends List" icon={<FaUserFriends />} href="/settings/friends" />
        <SettingsItem label="Logout" icon={<FaSignOutAlt />} href="#" />
      </SettingsCategory>
    </div>
  );
}
