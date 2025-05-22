'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OnboardingTutorialProps {
  onComplete: () => void;
}

interface TutorialStep {
  title: string;
  description: string;
  image: string;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Welcome to Circles!",
      description: "Circles is a social platform that helps you connect with friends, family, and communities that matter to you.",
      image: "/images/circles/default.svg"
    },
    {
      title: "Create and Join Circles",
      description: "Create your own circles or join existing ones to share memories with specific groups of people.",
      image: "/images/circles/image.png"
    },
    {
      title: "Share Albums",
      description: "Create albums to share photos with your circles or friends. Keep memories private to specific groups.",
      image: "/images/albums/default.svg"
    },
    {
      title: "Interact with Friends",
      description: "Like and comment on albums shared by your friends and circles. Stay connected with what matters.",
      image: "/images/albums/year1.jpeg"
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step completed
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    // Store completion in local storage to avoid showing again
    localStorage.setItem('onboardingComplete', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="relative h-48 sm:h-64 bg-circles-dark-blue">
          <Image
            src={tutorialSteps[currentStep].image}
            alt={tutorialSteps[currentStep].title}
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {tutorialSteps[currentStep].title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {tutorialSteps[currentStep].description}
          </p>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSkip}
              className="text-gray-500 dark:text-gray-400 hover:underline"
            >
              Skip
            </button>

            <div className="flex space-x-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep 
                      ? 'bg-circles-dark-blue' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-circles-dark-blue text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              {currentStep < tutorialSteps.length - 1 ? 'Next' : 'Get Started'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
