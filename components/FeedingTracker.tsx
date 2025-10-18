import React from 'react';
import Card from './Card';
import Button from './Button';
import { FeedingLog } from '../types';
import { useUser } from '../context/UserContext';

interface FeedingTrackerProps {
  logs: FeedingLog[];
  onLogClick: () => void;
  loading: boolean;
}

const FeedingTracker: React.FC<FeedingTrackerProps> = ({ logs, onLogClick, loading }) => {
    const { userData } = useUser();
    const isMom = userData?.parentType === 'mum';
    const iconColor = isMom ? 'text-mom-pink' : 'text-totocare-blue';

    const getFormattedTime = (isoTime: string) => {
        return new Date(isoTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    const renderContent = () => {
        if (loading) {
            return <p className="text-text-secondary">Loading logs...</p>;
        }

        if (logs.length === 0) {
            return <p className="text-text-secondary">No feedings logged yet. Tap "Log Feeding" to start.</p>;
        }

        const latestLog = logs[0];

        return (
            <div>
                <p className="text-text-secondary mb-4">
                    Last log at <span className="font-bold">{getFormattedTime(latestLog.time)}</span> ({latestLog.type === 'breastfeeding' ? `${latestLog.duration} mins` : `${latestLog.amount} ml`})
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    {logs.slice(0, 3).map(log => (
                        <div key={log.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-md">
                            <div>
                                <span className="font-semibold capitalize">{log.type.replace('_', ' ')}</span>
                                <span className="text-text-secondary ml-2">
                                    {log.type === 'breastfeeding' ? `${log.duration} mins` : `${log.amount} ml`}
                                </span>
                            </div>
                            <span className="text-text-secondary">{getFormattedTime(log.time)}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Card
            title="Feeding Tracker"
            icon={<span className={`material-symbols-outlined text-3xl ${iconColor}`}>restaurant</span>}
            footerContent={
                <div className="flex justify-end">
                    <Button onClick={onLogClick} disabled={loading}>
                        <span className="material-symbols-outlined mr-2">add</span>
                        Log Feeding
                    </Button>
                </div>
            }
        >
            {renderContent()}
        </Card>
    );
};

export default FeedingTracker;
