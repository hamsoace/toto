
import React, { useState } from 'react';
import Button from '../Button';

interface WelcomeStepProps {
  onNext: (name: string, phone: string) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNext = () => {
    if (name.trim() && phone.trim()) {
      onNext(name, phone);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome to Toto Care</h1>
      <p className="text-text-secondary mb-8">Your parenting companion for healthier families.</p>
      <div className="space-y-4 text-left">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Jane Doe"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-totocare-blue focus:border-totocare-blue sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-secondary">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g., 0712345678"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-totocare-blue focus:border-totocare-blue sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={handleNext} disabled={!name.trim() || !phone.trim()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
