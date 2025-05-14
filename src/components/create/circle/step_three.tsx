import {ICircleFormData} from "./circle_types";

export default function CreateCircleStepThree({formData, setFormData}: {formData: ICircleFormData; setFormData: React.Dispatch<React.SetStateAction<ICircleFormData>>}) {
    const handlePrivacyChange = (isPrivate: boolean) => setFormData({...formData, isPrivate});

    return (
        <>
            <div className="mt-[70%]">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-white text-lg">Public or Private</h3>
                        <p className="text-gray-400 text-sm">Make new circle private or public</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full">
                        <input
                            type="checkbox"
                            className="opacity-0 w-0 h-0"
                            checked={!formData.isPrivate}
                            onChange={() => handlePrivacyChange(!formData.isPrivate)}
                            id="privacy-toggle"
                        />
                        <label
                            htmlFor="privacy-toggle"
                            className={`block overflow-hidden h-6 rounded-full cursor-pointer ${!formData.isPrivate ? "bg-gray-300" : "bg-neutral-800"}`}
                        >
                            <span className={`block h-4 w-4 rounded-full bg-white transform transition-transform ${!formData.isPrivate ? "translate-x-6" : "translate-x-1"} mt-1`}></span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
