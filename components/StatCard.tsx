import React from 'react';
import { useUser } from '../context/UserContext';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  const { userData } = useUser();
  const isMom = userData?.parentType === 'mum';
  const valueColor = isMom ? 'text-mom-pink' : 'text-totocare-blue';

  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center">
      {icon && <div className={`text-3xl ${valueColor} mb-2 mx-auto`}>{icon}</div>}
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      <div className="text-sm text-text-secondary mt-1">{label}</div>
    </div>
  );
};

export default StatCard;