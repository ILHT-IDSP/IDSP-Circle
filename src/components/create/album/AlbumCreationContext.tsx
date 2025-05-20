'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlbumPhoto } from '../create_album';

// Define the shape of our context data
interface IAlbumFormData {
	title: string;
	coverImage: string;
	description: string;
	isPrivate: boolean;
	creatorId: string | undefined;
	circleId: string | null;
	photos: AlbumPhoto[];
}

interface AlbumCreationContextType {
	albumData: IAlbumFormData;
	setAlbumData: React.Dispatch<React.SetStateAction<IAlbumFormData>>;
	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	clearAlbumData: () => void;
}

// Create context with a default value
const AlbumCreationContext = createContext<AlbumCreationContextType | null>(null);

// Default album data
const defaultAlbumData: IAlbumFormData = {
	title: '',
	coverImage: '',
	description: '',
	isPrivate: true,
	creatorId: undefined,
	circleId: null,
	photos: [],
};

// Provider component
export const AlbumCreationProvider = ({ children }: { children: ReactNode }) => {
	const [albumData, setAlbumData] = useState<IAlbumFormData>(defaultAlbumData);
	const [currentStep, setCurrentStep] = useState<number>(1);

	// Function to reset the album creation state
	const clearAlbumData = () => {
		setAlbumData(defaultAlbumData);
		setCurrentStep(1);
	};

	return (
		<AlbumCreationContext.Provider
			value={{
				albumData,
				setAlbumData,
				currentStep,
				setCurrentStep,
				clearAlbumData,
			}}
		>
			{children}
		</AlbumCreationContext.Provider>
	);
};

// Custom hook to use the context
export const useAlbumCreation = (): AlbumCreationContextType => {
	const context = useContext(AlbumCreationContext);
	if (!context) {
		throw new Error('useAlbumCreation must be used within an AlbumCreationProvider');
	}
	return context;
};
