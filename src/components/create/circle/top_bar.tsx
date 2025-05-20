import {AwesomeIcon} from "../../../../public/icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function CreateCircleTopBar({onClick, onClickTwo, step}: {onClick: () => void; onClickTwo: () => void; step: number}) {
    return (
        <>
            <header className="flex items-center justify-between px-4 py-3 w-full pt-6 relative">
                <button
                    className="flex items-center hover:cursor-pointer hover:opacity-70 transition-all"
                    onClick={onClickTwo}
                    // disabled={isSubmitting}
                >
                    <AwesomeIcon
                        icon={faArrowLeft}
                        width={25}
                        height={25}
                    />
                </button>
                <div className="flex flex-col items-center">
                    <span className=" text-2xl font-medium">{step === 2 ? <>Invite Friends</> : <>New Circle</>}</span>
                    {step === 2 ? <p className="text-[0.6rem] max-w-[65%] text-center text-neutral-600">search or add friends to collaborate with in your circle</p> : <p></p>}
                </div>

                <button
                    onClick={onClick}
                    className="font-medium hover:cursor-pointer hover:opacity-70 transition-all"
                >
                    {step === 3 ? <>Create</> : <>Next</>}
                </button>
            </header>
        </>
    );
}
