import React from 'react';
import { ANCVisit } from '../types';
import { ClinicIcon } from './icons/ClinicIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { useUser } from '../context/UserContext';

interface ANCVisitCardProps {
  visit: ANCVisit;
}

const DetailItem: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
    <div className="flex flex-col">
        <span className="text-xs text-text-secondary">{label}</span>
        <span className="text-base font-semibold text-text-primary">{value} {unit}</span>
    </div>
);

const ANCVisitCard: React.FC<ANCVisitCardProps> = ({ visit }) => {
  const { userData } = useUser();
  const isMom = userData?.parentType === 'mum';

  const headerBgColor = isMom ? 'bg-pink-100' : 'bg-totocare-blue-light';
  const headerTextColor = isMom ? 'text-mom-pink' : 'text-totocare-blue';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div className={`p-4 ${headerBgColor} border-b border-gray-200`}>
        <div className="flex justify-between items-center">
          <h4 className={`text-lg font-bold ${headerTextColor}`}>Visit #{visit.visitNumber}</h4>
          <div className="flex items-center text-sm text-text-secondary">
             <CalendarIcon className="w-4 h-4 mr-2" />
             <span>{new Date(visit.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <DetailItem label="Weight" value={visit.weight} unit="kg" />
            <DetailItem label="Blood Pressure" value={visit.bloodPressure} />
            <DetailItem label="IFAS Tablets" value={visit.ifasTablets} unit="pills" />
        </div>
         <div className="flex items-center text-sm text-text-secondary bg-gray-50 p-3 rounded-lg">
            <ClinicIcon className="w-5 h-5 mr-3 flex-shrink-0 text-gray-400" />
            <span className="font-medium">{visit.clinicName}</span>
        </div>
        {visit.notes && (
            <div>
                <h5 className="text-sm font-semibold text-text-primary mb-1">Clinic Notes</h5>
                <p className="text-sm text-text-secondary bg-gray-50 p-3 rounded-lg border border-gray-200">{visit.notes}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ANCVisitCard;