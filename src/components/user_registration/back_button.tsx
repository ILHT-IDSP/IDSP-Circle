import {AwesomeIcon} from "../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {IBackButtonProps} from "./register_types";

export function BackButton({handleBack}: IBackButtonProps) {
    return (
        <>
            <button className="">
                <AwesomeIcon
                    icon={faArrowLeft}
                    className="w-10 h-10 mt-5 p-2 text-black"
                    onClick={handleBack}
                />
            </button>
        </>
    );
}
