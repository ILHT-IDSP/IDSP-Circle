import {useEffect, useState} from "react";
import {Circle} from "../circle/circle_types";

export default function CreateAlbumStepThree() {
    const [circles, setCircles] = useState<Circle[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getCircles = async () => {
            const response = await fetch("/api/getCircles");
            if (!response.ok) throw new Error("U sold jitt");
            const data = await response.json();
            setCircles(data.data);
            setLoading(false);
        };
        getCircles();
    }, []);

    if (loading) return <div>Loading circles...</div>;

    return (
        <>
            <div className="mt-25 grid grid-cols-3 gap-y-8 gap-x-4 justify-items-center">
                {circles.map((circle) => (
                    <div
                        key={circle.id}
                        className="flex flex-col items-center"
                    >
                        <button onClick={() => console.log("implement")}>
                            <img
                                src={circle.avatar || "/images/circles/default.svg"}
                                alt={circle.name}
                                className="w-20 h-20 rounded-full border-2 border-white object-cover shadow-md"
                            />
                            <span className="text-white text-xs text-center mt-2 max-w-[80px] truncate">{circle.name}</span>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
