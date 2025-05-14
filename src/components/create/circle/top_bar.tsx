import {AwesomeIcon} from "../../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function CreateCircleTopBar({onClick, onClickTwo, step}: {onClick: () => void; onClickTwo: () => void; step: number}) {
    return (
        <>
            <header className="flex items-center justify-between px-4 py-3 w-full pt-6 relative">
                <button
                    className="flex items-center"
                    onClick={onClickTwo}
                >
                    <AwesomeIcon
                        icon={faArrowLeft}
                        width={25}
                        height={25}
                    />
                </button>
                <div className="flex-1 text-center relative top-4">
                    {/* <h2 className="text-lg font-semibold whitespace-nowrap">New Circle</h2> */}
                    {step === 2 ? <h2 className="text-lg font-semibold whitespace-nowrap">Invite Friends</h2> : <h2 className="text-lg font-semibold whitespace-nowrap">New Circle</h2>}
                </div>

                <button
                    onClick={onClick}
                    className="text-base font-medium text-white"
                >
                    Next
                </button>
            </header>
        </>
    );
}
