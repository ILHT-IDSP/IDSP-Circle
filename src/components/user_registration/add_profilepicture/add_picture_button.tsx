export default function AddPictureButton() {
    return (
        <>
            <button
                // need to pullup file explorer window or sum shi 🔥🔥
                type="reset"
                className={`bg-blue-600 text-2xl text-white text-center rounded-full p-2 m-au w-full max-w-full transition-colors`}
            >
                Add Picture
            </button>
        </>
    );
}
