import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import TipCard from '../components/TipCard';
import Button from '../components/Button';
import BadgesOverview from '../components/BadgesOverview';
import FeedingTracker from '../components/FeedingTracker';
import FeedingLoggerModal from '../components/FeedingLoggerModal';
import { FeedingLog, FeedingLogData } from '../types';
import MoodTracker from '../components/MoodTracker';
import { getFeedingLogs, addFeedingLog as apiAddFeedingLog } from '../services/feedingLogService';

const MumDashboard: React.FC = () => {
    const { userData } = useUser();
    const [feedingLogs, setFeedingLogs] = useState<FeedingLog[]>([]);
    const [isFeedingModalOpen, setIsFeedingModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userData?.babyId) {
            const fetchFeedingLogs = async () => {
                try {
                    setLoading(true);
                    const logs = await getFeedingLogs(userData.babyId);
                    setFeedingLogs(logs);
                    setError(null);
                } catch (err) {
                    setError('Failed to fetch feeding logs. Please try again later.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchFeedingLogs();
        }
    }, [userData?.babyId]);

    const handleAddFeedingLog = async (logData: FeedingLogData) => {
        if (!userData?._id || !userData.babyId) {
            setError("User or baby information is missing. Cannot log feeding.");
            return;
        }
        
        setIsSubmitting(true);
        setError(null);

        try {
            const newLogPayload = { 
                ...logData, 
                baby: userData.babyId, 
                user: userData._id 
            };
            const newLog = await apiAddFeedingLog(newLogPayload);
            setFeedingLogs([newLog, ...feedingLogs]);
            setIsFeedingModalOpen(false); // Close modal on success
        } catch (err) {
            setError("Failed to save feeding log. Please check your connection and try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="space-y-6">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Feedings Today" value={feedingLogs.filter(log => new Date(log.time).toDateString() === new Date().toDateString()).length} />
                    <StatCard label="Sleep Hours" value={14} />
                    <StatCard label="Diapers Changed" value={3} />
                    <StatCard label="Milestones" value="75%" />
                </div>

                <Card
                    title="How Are You Feeling Today?"
                    icon={<span className="material-symbols-outlined text-3xl text-purple-500">psychology</span>}
                >
                    <p className="text-text-secondary mb-4">Your mental health is important. Take a moment to check in with yourself.</p>
                    <MoodTracker />
                     <div className="mt-4 flex justify-end">
                        <Button variant='secondary' onClick={() => alert('Journal feature coming soon!')}>
                           <span className="material-symbols-outlined mr-2">edit</span>
                           Journal Feelings
                        </Button>
                    </div>
                </Card>

                <FeedingTracker logs={feedingLogs} onLogClick={() => setIsFeedingModalOpen(true)} loading={loading} />

                <Card
                    title="Vaccination Schedule"
                    icon={<span className="material-symbols-outlined text-3xl text-green-500">vaccines</span>}
                >
                    <p className="text-text-secondary mb-2">Next vaccination due in 2 weeks: DTaP, Hib, Polio, PCV13</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">60% complete</p>
                    <div className="mt-4 flex justify-end">
                        <Button onClick={() => alert('Vaccination schedule details coming soon!')}>
                           <span className="material-symbols-outlined mr-2">visibility</span>
                           View Schedule
                        </Button>
                    </div>
                </Card>

                <BadgesOverview />

                <TipCard title="Did You Know?">
                    <p>Breastfeeding provides perfect nutrition for your baby and protects them from infections. Kenya's Ministry of Health recommends exclusive breastfeeding for the first 6 months.</p>
                </TipCard>
            </div>
            <FeedingLoggerModal 
                isOpen={isFeedingModalOpen}
                onClose={() => setIsFeedingModalOpen(false)}
                onSubmit={handleAddFeedingLog}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

const DadDashboard: React.FC = () => {
    return (
         <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Bottle Feedings" value={2} />
                <StatCard label="Diapers Changed" value={3} />
                <StatCard label="Play Hours" value={1.5} />
                <StatCard label="Support Score" value="85%" />
            </div>

            <Card
                title="Dad's Tasks Today"
                icon={<span className="material-symbols-outlined text-3xl text-totocare-blue">checklist</span>}
            >
                <p className="text-text-secondary mb-4">Here's how you can help and bond with your baby today.</p>
                 <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Task management feature coming soon!')}>
                       <span className="material-symbols-outlined mr-2">add</span>
                       Add Task
                    </Button>
                </div>
            </Card>
            
            <Card
                title="Partner Support"
                icon={<span className="material-symbols-outlined text-3xl text-green-500">favorite</span>}
            >
                <p className="text-text-secondary mb-4">Sarah had a good night's sleep thanks to your help with the 2 AM feeding!</p>
                <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Appreciation sent!')}>
                       <span className="material-symbols-outlined mr-2">local_florist</span>
                       Send Appreciation
                    </Button>
                </div>
            </Card>

            <BadgesOverview />
            
             <TipCard title="How to Help" variant="ppd">
                <p>Offer to take care of the baby so she can rest, encourage her to talk about her feelings, and remind her that she's doing a great job.</p>
            </TipCard>
        </div>
    );
}

const DashboardPage: React.FC = () => {
  const { userData } = useUser();
  const isMom = userData?.parentType === 'mum';
  const welcomeName = userData?.name.split(' ')[0] || 'there';
  const babyName = userData?.babyName || 'your baby';
  
  return (
    <div className="space-y-6">
        <div className={`p-6 rounded-xl text-white shadow-lg ${isMom ? 'bg-mom-pink' : 'bg-totocare-blue'}`}>
            <h1 className="text-3xl font-bold">Hello, {welcomeName}!</h1>
            <p className="mt-1 opacity-90">Here is an overview of {babyName}'s health today.</p>
        </div>
        
        {isMom ? <MumDashboard /> : <DadDashboard />}
    </div>
  );
};

export default DashboardPage;
