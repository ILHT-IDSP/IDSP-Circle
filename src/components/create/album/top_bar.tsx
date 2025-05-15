import {AwesomeIcon} from "../../../../public/icons";
import {faX} from "@fortawesome/free-solid-svg-icons";

export default function CreateAlbumTopBar({step}: {step: number}) {
    return (
        <>
            <header className="flex items-center justify-between px-4 py-3 w-full pt-6 relative">
                <button className="flex items-center">
                    <a href="/profile">
                        <AwesomeIcon
                            icon={faX}
                            width={25}
                            height={25}
                        />
                    </a>
                </button>
                <div className="flex-1 text-center relative top-4 flex-col justify-items-center">
                    <h2 className="">{step === 3 ? <>Add to a Circle</> : step === 4 ? <>Post</> : <>New Album</>}</h2>
                    <p className="text-xs text-neutral-600 max-w-[75%]">select which photos you want to add to your album</p>
                </div>

                <button className="text-base font-medium text-white"></button>
            </header>
        </>
    );
}
