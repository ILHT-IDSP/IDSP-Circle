import {AwesomeIcon} from "../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export function BackButton() {
    return (
        <>
            <div className="">
                <button className="">
                    <AwesomeIcon
                        icon={faArrowLeft}
                        className="w-10 h-10 mt-5 p-2 text-black"
                    />
                </button>
            </div>
        </>
    );
}
