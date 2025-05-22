import {Circle} from "lucide-react";
import CirclesLogo from "../Circles_Logo";
import Link from "next/link";

export default function CreateCircleIcon() {
    return (
        <>
            <div className="flex flex-col items-center">
                <Link
                    href="/create/circle"
                    className="flex flex-col items-center justify-items-center gap-2"
                >
                    <div
                        id="circle-icon-container"
                        className="bg-[var(--circles-dark-blue)] p-3 flex items-center h-20 w-20 rounded-2xl"
                    >
                        <div className="filter flex m-auto">
                            <CirclesLogo
                                width={45}
                                height={45}
                                showText={false}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-[var(--foreground)] text-sm">create new circle</p>
                    </div>
                </Link>
            </div>
        </>
    );
}
