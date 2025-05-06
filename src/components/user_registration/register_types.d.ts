export interface IFormData {
    email: string;
    confirmEmail: string;
    password: string;
    birthday: string;
    firstName: string;
    lastName: string;
    username: string;
}

export interface EnterEmailProps {
    formData: IformData;
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
    onNext: () => void;
}

export interface IInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
