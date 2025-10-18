import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const moods = [
  { emoji: '😢', label: 'Very Sad' },
  { emoji: '😞', label: 'Sad' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😁', label: 'Great' },
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>('Neutral');
  const { userData } = useUser();
  const isMom = userData?.parentType === 'mum';

  const selectedRingClass = isMom ? 'ring-mom-pink' : 'ring-totocare-blue';

  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-4">
      {moods.map((mood) => (
        <div
          key={mood.label}
          onClick={() => setSelectedMood(mood.label)}
          className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
            selectedMood === mood.label
              ? `ring-2 ${selectedRingClass} border-transparent`
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-3xl">{mood.emoji}</span>
          <span className="text-xs text-text-secondary mt-1 hidden sm:block">{mood.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MoodTracker;
