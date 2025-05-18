import AlbumSettingsHeader from "@/components/album_settings/album_settings_header";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import AlbumSettingBars from "@/components/album_settings/bar";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {faBell} from "@fortawesome/free-solid-svg-icons";

export default async function AlbumSettingsPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/login");
    }

    return (
        <>
            <div id="album-settings-wrapper">
                <AlbumSettingsHeader />

                <section className="max-w-full m-0 p-0 w-full">
                    <AlbumSettingBars
                        icon={faLock}
                        title={"Privacy"}
                    />
                    <h3 className="mt-10">Circle Default Privacy</h3>

                    <form className="w-full space-y-3 mt-3 ">
                        <div className="m-6 flex flex-col gap-2">
                            <label className="flex items-center justify-between w-full py-2 mt-0">
                                <span>Private (Default)</span>
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="private"
                                    className="form-radio h-5 w-5 text-blue-500"
                                    defaultChecked
                                />
                            </label>
                            <label className="flex items-center justify-between w-full py-2">
                                <span>Public</span>
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="public"
                                    className="form-radio h-5 w-5 text-blue-500"
                                />
                            </label>
                        </div>
                    </form>
                </section>

                <section className="w-full max-w-full p-0 m-0">
                    <AlbumSettingBars
                        icon={faBell}
                        title={"Notifications"}
                    />
                    <h3 className="mt-10">Mute Notifications</h3>
                    <form action="">
                        <div className="m-6 flex flex-col gap-2">
                            <label className="flex items-center justify-between w-full py-2 cursor-pointer">
                                <span className="mr-3">For new Contents</span>
                                <span className="relative inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-neutral-800 rounded-full peer peer-checked:bg-neutral-600 transition-colors duration-200"></div>
                                    <div className="absolute left-1 top-1 bg-blue-500 w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                                </span>
                            </label>
                            <label className="flex items-center justify-between w-full py-2 cursor-pointer">
                                <span className="mr-3">For new Comments</span>
                                <span className="relative inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-neutral-800 rounded-full peer peer-checked:bg-neutral-600 transition-colors duration-200"></div>
                                    <div className="absolute left-1 top-1 bg-blue-500 w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                                </span>
                            </label>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}
