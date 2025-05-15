import {ICircleFormData} from "./circle_types";

export default function CreateCircleStepOne({formData, setFormData}: {formData: ICircleFormData; setFormData: React.Dispatch<React.SetStateAction<ICircleFormData>>}) {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value});

    return (
        <>
            <form action="" className="w-full">
                <label className="flex flex-row gap-3 relative border-b border-gray-700 w-full">
                    {/* <span className=" align-bottom">Name</span> */}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleNameChange}
                        className="focus:outline-none w-full text-base relative top-1 bg-transparent pb-2"
                        placeholder="Give your circle a name..."
                    />
                </label>
                <p className="mt-4 text-sm text-gray-400">
                    Circles are public by default. Members can share photos, posts, and organize events together.
                </p>
            </form>
        </>
    );
}
