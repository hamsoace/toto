import React, { useState, useEffect } from 'react';
import { FeedingLogData, FeedingType } from '../types';
import Modal from './Modal';
import Button from './Button';
import { useUser } from '../context/UserContext';

interface FeedingLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (log: FeedingLogData) => Promise<void>;
  isSubmitting: boolean;
}

const initialFormState = {
  type: 'breastfeeding' as FeedingType,
  time: new Date().toISOString(),
  duration: 15,
  amount: 120,
  notes: '',
};

const FeedingLoggerModal: React.FC<FeedingLoggerModalProps> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formState, setFormState] = useState(initialFormState);
  const { userData } = useUser();
  const isMom = userData?.parentType === 'mum';
  
  const focusRingClass = isMom ? 'focus:ring-mom-pink focus:border-mom-pink' : 'focus:ring-totocare-blue focus:border-totocare-blue';
  const inputClass = `mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm ${focusRingClass}`;
  
  const activeTabClass = isMom ? 'bg-mom-pink text-white' : 'bg-totocare-blue text-white';
  const inactiveTabClass = 'bg-gray-200 text-text-secondary hover:bg-gray-300';

  useEffect(() => {
    if (isOpen) {
      setFormState({ ...initialFormState, time: new Date().toISOString() });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: (name === 'duration' || name === 'amount') ? parseInt(value, 10) || 0 : value,
    }));
  };
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const [timeStr] = e.target.value.split('.');
     const [hours, minutes] = timeStr.split(':');
     const newDate = new Date(formState.time);
     newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
     setFormState(prevState => ({ ...prevState, time: newDate.toISOString() }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const logData: FeedingLogData = {
        type: formState.type,
        time: formState.time,
        notes: formState.notes,
    };

    if (formState.type === 'breastfeeding') {
        logData.duration = formState.duration;
    } else {
        logData.amount = formState.amount;
    }
    
    await onSubmit(logData);
  };
  
  const currentTime = new Date(formState.time).toTimeString().substring(0,5);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log a Feeding">
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset disabled={isSubmitting}>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Feeding Type</label>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setFormState(prev => ({...prev, type: 'breastfeeding'}))}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-md transition ${formState.type === 'breastfeeding' ? activeTabClass : inactiveTabClass}`}
                >
                  Breastfeeding
                </button>
                <button
                  type="button"
                  onClick={() => setFormState(prev => ({...prev, type: 'bottle'}))}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-md transition ${formState.type === 'bottle' ? activeTabClass : inactiveTabClass}`}
                >
                  Bottle
                </button>
              </div>
            </div>

            {formState.type === 'breastfeeding' ? (
               <div>
                <label htmlFor="duration" className="block text-sm font-medium text-text-secondary">Duration (minutes)</label>
                <input type="number" id="duration" name="duration" value={formState.duration} onChange={handleChange} required className={inputClass} />
              </div>
            ) : (
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Amount (ml)</label>
                <input type="number" id="amount" name="amount" value={formState.amount} onChange={handleChange} required className={inputClass} />
              </div>
            )}

             <div>
                <label htmlFor="time" className="block text-sm font-medium text-text-secondary">Time</label>
                <input type="time" id="time" name="time" value={currentTime} onChange={handleTimeChange} required className={inputClass} />
              </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-text-secondary">Notes (optional)</label>
              <textarea id="notes" name="notes" rows={2} value={formState.notes} onChange={handleChange} className={inputClass} placeholder="e.g., Baby seemed very hungry"></textarea>
            </div>
        </fieldset>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Log'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FeedingLoggerModal;
