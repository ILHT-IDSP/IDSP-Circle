export interface IFormData {
    email?: string;
    confirmEmail?: string;
    password?: string;
    confirmPassword?: string;
    birthday?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    profileImage?: string;
}

export interface IFormDataProps {
    formData: IformData;
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
    onNext: () => void;
}

export interface IInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IBackButtonProps {
    handleBack: () => void;
}

export interface EnterBirthdayProps {
    formData: {birthday: string};
    setFormData: React.Dispatch<React.SetStateAction<{birthday: string}>>;
    onNext: () => void;
}
