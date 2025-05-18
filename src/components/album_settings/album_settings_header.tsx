"use client";

import {AwesomeIcon} from "../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {redirect} from "next/navigation";

export default function AlbumSettingsHeader() {
    return (
        <>
            <header className="relative h-25 flex items-center">
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 ml-2"
                    onClick={() => redirect("/settings")}
                >
                    <AwesomeIcon
                        icon={faArrowLeft}
                        fontSize={20}
                    />
                </button>
                <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Albums</h2>
            </header>
        </>
    );
}
