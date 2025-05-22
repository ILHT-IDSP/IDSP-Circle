import React, {useState, useEffect} from "react";
import Image from "next/image";
import {FaTimes} from "react-icons/fa";
import {redirect} from "next/navigation";

interface Photo {
    id: number;
    url: string;
    description: string | null;
    createdAt: string;
}

interface EditAlbumModalProps {
    album: {
        id: number;
        title: string;
        description: string | null;
        coverImage: string | null;
        isPrivate: boolean;
    };
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (updatedAlbum: any) => void;
    photos?: Photo[];
}

const EditAlbumModal: React.FC<EditAlbumModalProps> = ({album, isOpen, onClose, onUpdate, photos = []}) => {
    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description || "");
    const [isPrivate, setIsPrivate] = useState(album.isPrivate);
    const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(album.coverImage);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && photos.length === 0) {
            fetch(`/api/albums/${album.id}/photos`)
                .then((response) => response.json())
                .then((data) => {
                    setAlbumPhotos(data.photos);
                })
                .catch((error) => {
                    console.error("Error fetching album photos:", error);
                    setError("Failed to load album photos");
                });
        } else {
            setAlbumPhotos(photos);
        }
    }, [isOpen, album.id, photos]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/albums/${album.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description: description || null,
                    coverImage: selectedCoverImage,
                    isPrivate,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update album");
            }

            const updatedAlbum = await response.json();
            onUpdate(updatedAlbum);
            onClose();
        } catch (err) {
            console.error("Error updating album:", err);
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteButton = () => {
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();

            const response = await fetch(`/api/albums/delete/${album.id}`, {
                headers: {"content-type": "application/json"},
                method: "POST",
                body: JSON.stringify({albumId: album.id}),
            });
            if (!response.ok) throw new Error("Failed to delete album.");

            redirect("/");
            setShowDeleteConfirm(false);
        } catch (err) {
            redirect("/");
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100 p-4 overflow-y-auto"
            onClick={(e) => {
                // Close when clicking outside the modal
                if (e.target === e.currentTarget) onClose();
            }}
            style={{minHeight: "100vh"}}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl my-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold dark:text-white">Edit Album</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {error && <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows={4}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isPrivate}
                                    onChange={(e) => setIsPrivate(e.target.checked)}
                                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-gray-700 dark:text-gray-300">Private Album</span>
                            </label>
                        </div>{" "}
                        {/* Album Cover Selection */}
                        <>
                            <div className="mb-6">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Cover Image</label>
                                {albumPhotos.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        {albumPhotos.map((photo) => (
                                            <div
                                                key={photo.id}
                                                className={`relative cursor-pointer overflow-hidden rounded-lg transition-all mb-4 ${selectedCoverImage === photo.url ? "ring-2 ring-blue-500 scale-[0.98]" : "hover:opacity-90 hover:scale-[0.99]"}`}
                                                onClick={() => setSelectedCoverImage(photo.url)}
                                            >
                                                <Image
                                                    src={photo.url}
                                                    alt={photo.description || `Photo ${photo.id}`}
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-auto rounded-lg"
                                                    style={{display: "block"}}
                                                    sizes="(max-width: 640px) 50vw, 33vw"
                                                />
                                                {selectedCoverImage === photo.url && (
                                                    <div className="absolute top-2 right-2">
                                                        <div className="bg-blue-500 rounded-full p-1">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-white"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8 border rounded dark:border-gray-600">No photos available to use as cover. Add photos to the album first.</p>
                                )}
                            </div>
                            <div className={`rounded-sm max-w-full w-[50%] text-center p-1 my-10 ${showDeleteConfirm ? "bg-transparent" : "bg-red-400"}`}>
                                {showDeleteConfirm ? (
                                    <div className="flex flex-col items-center">
                                        <span className="mb-2 text-white">Are you sure you want to delete this album?</span>
                                        <div className="flex gap-2">
                                            <button
                                                className=" bg-red-500 px-3 py-1 rounded text-white"
                                                onClick={handleConfirmDelete}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                className="bg-white text-gray-700 px-3 py-1 rounded hover:bg-gray-100"
                                                onClick={handleCancelDelete}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        className="m-auto"
                                        onClick={handleDeleteButton}
                                    >
                                        Delete Album
                                    </button>
                                )}
                            </div>
                        </>
                        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAlbumModal;
