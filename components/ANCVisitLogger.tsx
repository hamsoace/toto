import React, { useState, useEffect } from 'react';
import { ANCVisit } from '../types';
import Modal from './Modal';
import Button from './Button';
import { useUser } from '../context/UserContext';

interface ANCVisitLoggerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (visit: Omit<ANCVisit, 'id' | 'visitNumber'>) => void;
  nextVisitNumber: number;
}

const initialFormState = {
  date: '',
  weight: 0,
  bloodPressure: '',
  ifasTablets: 0,
  clinicName: '',
  notes: '',
};

const ANCVisitLogger: React.FC<ANCVisitLoggerProps> = ({ isOpen, onClose, onSubmit, nextVisitNumber }) => {
  const [formState, setFormState] = useState(initialFormState);
  const { userData } = useUser();
  const isMom = userData?.parentType === 'mum';

  const focusRingClass = isMom ? 'focus:ring-mom-pink focus:border-mom-pink' : 'focus:ring-totocare-blue focus:border-totocare-blue';
  const inputClass = `mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm ${focusRingClass}`;

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormState({ ...initialFormState, date: new Date().toISOString().split('T')[0] });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'weight' || name === 'ifasTablets' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.date && formState.clinicName && formState.weight > 0) {
        onSubmit(formState);
        onClose();
    } else {
        alert("Please fill in at least Date, Weight, and Clinic Name.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Log ANC Visit #${nextVisitNumber}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text-secondary">Visit Date</label>
            <input type="date" id="date" name="date" value={formState.date} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-text-secondary">Weight (kg)</label>
            <input type="number" step="0.1" id="weight" name="weight" value={formState.weight} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="bloodPressure" className="block text-sm font-medium text-text-secondary">Blood Pressure (e.g., 120/80)</label>
            <input type="text" id="bloodPressure" name="bloodPressure" value={formState.bloodPressure} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label htmlFor="ifasTablets" className="block text-sm font-medium text-text-secondary">IFAS Tablets Received</label>
            <input type="number" id="ifasTablets" name="ifasTablets" value={formState.ifasTablets} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="clinicName" className="block text-sm font-medium text-text-secondary">Clinic Name</label>
          <input type="text" id="clinicName" name="clinicName" value={formState.clinicName} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-text-secondary">Notes from Clinic</label>
          <textarea id="notes" name="notes" rows={3} value={formState.notes} onChange={handleChange} className={inputClass}></textarea>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save Visit</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ANCVisitLogger;