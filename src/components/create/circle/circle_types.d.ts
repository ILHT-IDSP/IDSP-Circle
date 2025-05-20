export interface ICreateCircleFormData {
    formData: any;
    setFormData: () => void;
}

export interface ICircleFormData {
    avatar: string;
    name: string;
    isPrivate: boolean;
    members: number[];
    creatorId: number;
}

export interface Circle {
    id: number;
    name: string;
    description?: string;
    avatar: string;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    creatorId: number;
}
