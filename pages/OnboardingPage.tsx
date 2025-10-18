
import React, { useState } from 'react';
import { UserData, ParentType } from '../types';
import WelcomeStep from '../components/onboarding/WelcomeStep';
import ParentTypeStep from '../components/onboarding/ParentTypeStep';
import BabyDetailsStep from '../components/onboarding/BabyDetailsStep';

interface OnboardingPageProps {
  onOnboardingComplete: (data: UserData) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onOnboardingComplete }) => {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<UserData>>({});

  const handleWelcomeNext = (name: string, phone: string) => {
    setOnboardingData({ ...onboardingData, name, phone });
    setStep(2);
  };

  const handleParentSelect = (parentType: ParentType) => {
    setOnboardingData({ ...onboardingData, parentType });
    setStep(3);
  };

  const handleBabyDetailsComplete = (babyName: string, babyDueDate: string) => {
    const finalData = { ...onboardingData, babyName, babyDueDate } as UserData;
    onOnboardingComplete(finalData);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {step === 1 && <WelcomeStep onNext={handleWelcomeNext} />}
        {step === 2 && <ParentTypeStep onSelect={handleParentSelect} />}
        {step === 3 && <BabyDetailsStep onComplete={handleBabyDetailsComplete} />}
      </div>
    </div>
  );
};

export default OnboardingPage;
