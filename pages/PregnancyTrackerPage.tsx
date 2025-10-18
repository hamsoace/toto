
import React, { useState } from 'react';
import { ANCVisit } from '../types';
import ANCProgressTracker from '../components/ANCProgressTracker';
import ANCVisitCard from '../components/ANCVisitCard';
import ANCVisitLogger from '../components/ANCVisitLogger';
import Button from '../components/Button';
import { PlusIcon } from '../components/icons/PlusIcon';

const mockVisits: ANCVisit[] = [
  {
    id: '1',
    visitNumber: 1,
    date: '2024-05-20',
    weight: 65,
    bloodPressure: '110/70',
    ifasTablets: 30,
    clinicName: 'Nairobi Central Clinic',
    notes: 'Everything looks good. First trimester screening discussed.',
  },
  {
    id: '2',
    visitNumber: 2,
    date: '2024-06-18',
    weight: 67.5,
    bloodPressure: '112/72',
    ifasTablets: 30,
    clinicName: 'Nairobi Central Clinic',
    notes: 'Ultrasound performed, baby is developing well. Continue with IFAS.',
  },
];

const PregnancyTrackerPage: React.FC = () => {
  const [visits, setVisits] = useState<ANCVisit[]>(mockVisits);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addAncVisit = (visit: Omit<ANCVisit, 'id' | 'visitNumber'>) => {
    const newVisit: ANCVisit = {
      ...visit,
      id: new Date().toISOString(),
      visitNumber: visits.length + 1,
    };
    setVisits([...visits, newVisit]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-text-primary">Antenatal Care (ANC)</h2>
                <p className="text-text-secondary mt-1">Track your clinic visits to ensure a healthy pregnancy.</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
                <PlusIcon className="w-5 h-5 mr-2" />
                Log New Visit
            </Button>
        </div>
      </div>

      <ANCProgressTracker completedVisits={visits.length} />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-text-primary">Visit History</h3>
        {visits.length > 0 ? (
          visits.map((visit) => <ANCVisitCard key={visit.id} visit={visit} />)
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-md">
            <p className="text-text-secondary">No ANC visits logged yet.</p>
            <p className="text-sm text-gray-400 mt-2">Click "Log New Visit" to get started.</p>
          </div>
        )}
      </div>

      <ANCVisitLogger
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addAncVisit}
        nextVisitNumber={visits.length + 1}
      />
    </div>
  );
};

export default PregnancyTrackerPage;
