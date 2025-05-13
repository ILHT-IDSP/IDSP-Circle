import {AwesomeIcon} from "../../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function CreateCircleTopBar() {
    return (
        <>
            <header>
                <div>
                    <AwesomeIcon icon={faArrowLeft} />
                </div>
                <div>
                    <h2>New Circle</h2>
                </div>
                <div>
                    <p></p>
                </div>
            </header>
        </>
    );
}
