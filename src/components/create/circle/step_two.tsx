import {ICircleFormData} from "./circle_types";

export default function CreateCircleStepTwo({formData, setFormData}: {formData: ICircleFormData; setFormData: React.Dispatch<React.SetStateAction<ICircleFormData>>}) {
    return (
        <>
            <h3 className="flex justify-self-center text-xs text-neutral-400 font-thin">Search or add friends to collaborate with in your circle</h3>
            <form action="">
                <div
                    id="login-username-input"
                    className="rounded-3xl w-[90%] bg-white flex justify-between justify-self-center"
                >
                    {" "}
                    <input
                        type="text"
                        name="members"
                        placeholder="search friends"
                        className="rounded-3xl w-full bg-white text-black placeholder-black indent-2 p-1"
                        required
                    />
                </div>
            </form>
        </>
    );
}
