
import React from 'react';
import { ParentType } from '../../types';
import { ManIcon } from '../icons/ManIcon';
import { WomanIcon } from '../icons/WomanIcon';

interface ParentTypeStepProps {
  onSelect: (type: ParentType) => void;
}

const ParentTypeStep: React.FC<ParentTypeStepProps> = ({ onSelect }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Who are you?</h1>
      <p className="text-text-secondary mb-8">This will help us personalize your experience.</p>
      <div className="space-y-4">
        <div
          onClick={() => onSelect('mum')}
          className="flex items-center p-5 border-2 border-mom-pink rounded-lg cursor-pointer transition-all hover:shadow-lg hover:scale-105"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-pink-100 text-mom-pink">
            <WomanIcon className="w-8 h-8" />
          </div>
          <div className="text-left flex-1">
            <div className="font-bold text-lg text-mom-pink">I'm a Mum</div>
            <p className="text-text-secondary text-sm">Track your health and baby's development.</p>
          </div>
        </div>
        <div
          onClick={() => onSelect('dad')}
          className="flex items-center p-5 border-2 border-dad-blue rounded-lg cursor-pointer transition-all hover:shadow-lg hover:scale-105"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-blue-100 text-dad-blue">
            <ManIcon className="w-8 h-8" />
          </div>
          <div className="text-left flex-1">
            <div className="font-bold text-lg text-dad-blue">I'm a Dad</div>
            <p className="text-text-secondary text-sm">Support your partner and bond with your baby.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentTypeStep;
