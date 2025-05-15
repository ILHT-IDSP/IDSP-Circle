export interface ICreateCircle {}

export interface ICreateCircleFormData {
    formData: any;
    setFormData: () => void;
}

export interface ICircleFormData {
    avatar: string;
    name: string;
    isPrivate: boolean;
    members: string[]; // or string[] if it's an array of members
    creatorId: string;
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
