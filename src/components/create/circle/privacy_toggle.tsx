import {AwesomeIcon} from "../../../../public/icons";
import {faLock, faGlobe} from "@fortawesome/free-solid-svg-icons";

export default function PrivacyToggle({formData, setFormData, toggleHandler}: {formData; setFormData; toggleHandler}) {
    return (
        <>
            <div
                id="privacy-toggle"
                className="flex flex-row justify-between items-center py-4 m-2"
            >
                <div id="toggle-privacy-descriptions">
                    <h2 className="text-white font-semibold mb-0">Public or Private</h2>
                    <h4 className="text-neutral-500 text-sm mt-0">Make new circle private or public</h4>
                </div>
                <div className="flex items-center gap-2">
                    {formData.isPrivate ? (
                        <AwesomeIcon
                            icon={faLock}
                            className="text-white"
                            fontSize={15}
                        />
                    ) : (
                        <AwesomeIcon
                            icon={faGlobe}
                            fontSize={15}
                            className="text-white"
                        />
                    )}
                    <button
                        type="button"
                        onClick={toggleHandler}
                        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300
			${formData.isPrivate ? "bg-neutral-900" : "bg-neutral-400"}`}
                        aria-label="Toggle privacy"
                    >
                        <span
                            className={`w-4 h-4 bg-black rounded-full shadow-md transform transition-transform duration-300
				${formData.isPrivate ? "translate-x-0" : "translate-x-4"}`}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}
