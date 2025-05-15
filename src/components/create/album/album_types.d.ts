export interface IAlbumFormData {
    formData: ICreateAlbumFormData;
    setFormData: () => void;
}

export interface ICreateAlbumFormData {
    coverImage: string;
    circle: number;
}
