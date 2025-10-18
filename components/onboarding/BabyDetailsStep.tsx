
import React, { useState } from 'react';
import Button from '../Button';

interface BabyDetailsStepProps {
  onComplete: (babyName: string, babyDueDate: string) => void;
}

const BabyDetailsStep: React.FC<BabyDetailsStepProps> = ({ onComplete }) => {
  const [babyName, setBabyName] = useState('');
  const [babyDueDate, setBabyDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleComplete = () => {
    if (babyName.trim() && babyDueDate) {
      onComplete(babyName, babyDueDate);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Tell us about your baby</h1>
      <p className="text-text-secondary mb-8">This helps us track important milestones.</p>
      <div className="space-y-4 text-left">
        <div>
          <label htmlFor="babyName" className="block text-sm font-medium text-text-secondary">Baby's Name (or nickname)</label>
          <input
            type="text"
            id="babyName"
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            placeholder="e.g., Toto"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-totocare-blue focus:border-totocare-blue sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="babyDueDate" className="block text-sm font-medium text-text-secondary">Expected Due Date / Birth Date</label>
          <input
            type="date"
            id="babyDueDate"
            value={babyDueDate}
            onChange={(e) => setBabyDueDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-totocare-blue focus:border-totocare-blue sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={handleComplete} disabled={!babyName.trim() || !babyDueDate}>
          Finish Setup
        </Button>
      </div>
    </div>
  );
};

export default BabyDetailsStep;
