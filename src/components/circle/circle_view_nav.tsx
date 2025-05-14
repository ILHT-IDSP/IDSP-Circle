import {AwesomeIcon} from "../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faLink} from "@fortawesome/free-solid-svg-icons";
// import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {faPencil} from "@fortawesome/free-solid-svg-icons";

export default function CircleViewNav() {
    return (
        <>
            <header className="flex flex-row justify-self-center space-x-65 max-h-full mt-15">
                <div>
                    <AwesomeIcon
                        icon={faArrowLeft}
                        width={25}
                        height={25}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <AwesomeIcon
                        icon={faPencil}
                        width={25}
                        height={25}
                    />
                    <AwesomeIcon
                        icon={faLink}
                        width={25}
                        height={25}
                    />
                </div>
            </header>
        </>
    );
}
