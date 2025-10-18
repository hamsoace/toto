
import React from 'react';
import { useUser } from '../context/UserContext';

interface ANCProgressTrackerProps {
  completedVisits: number;
  totalVisits?: number;
}

const ANCProgressTracker: React.FC<ANCProgressTrackerProps> = ({ completedVisits, totalVisits = 8 }) => {
  const { userData } = useUser();
  const progressPercentage = (completedVisits / totalVisits) * 100;

  const isMom = userData?.parentType === 'mum';
  const progressColor = isMom ? 'bg-mom-pink' : 'bg-totocare-blue';


  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold text-lg text-text-primary">Your ANC Progress</h3>
      <p className="text-text-secondary text-sm mt-1">
        You've completed <span className={`font-bold ${isMom ? 'text-mom-pink' : 'text-totocare-blue'}`}>{completedVisits}</span> of <span className="font-bold">{totalVisits}</span> recommended visits.
      </p>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${progressColor} h-4 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {completedVisits < totalVisits && (
        <p className="text-xs text-gray-500 mt-2">Keep up the great work! Your next visit is important.</p>
      )}
      {completedVisits >= totalVisits && (
        <p className="text-xs text-success font-medium mt-2">Congratulations on completing all recommended ANC visits!</p>
      )}
    </div>
  );
};

export default ANCProgressTracker;