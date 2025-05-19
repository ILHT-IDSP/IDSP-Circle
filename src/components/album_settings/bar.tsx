import {AwesomeIcon} from "../../../public/icons";
import {faLock} from "@fortawesome/free-solid-svg-icons";

export default function AlbumSettingBars({icon, title}) {
    return (
        <>
            <div
                id="bar"
                className="p-3 bg-neutral-800 rounded-2xl flex flex-row gap-3"
            >
                <AwesomeIcon
                    icon={icon}
                    className="mt-1"
                />
                <h3>{title}</h3>
            </div>
        </>
    );
}
