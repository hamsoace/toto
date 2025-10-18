import React from 'react';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import ANCProgressTracker from '../components/ANCProgressTracker';

const GrowthPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Card
                title="Growth Tracking"
                icon={<span className="material-symbols-outlined text-3xl text-totocare-blue">height</span>}
            >
                <p className="text-text-secondary mb-4">Your baby's growth is progressing well. They're in the 75th percentile for height and 70th for weight.</p>
                 <div className="grid grid-cols-2 gap-4">
                    <StatCard value="62 cm" label="Height" />
                    <StatCard value="6.2 kg" label="Weight" />
                </div>
                 <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Interactive growth charts coming soon!')}>
                       <span className="material-symbols-outlined mr-2">show_chart</span>
                       View Growth Charts
                    </Button>
                </div>
            </Card>
            
            <Card
                title="Development Milestones"
                icon={<span className="material-symbols-outlined text-3xl text-purple-500">psychology</span>}
            >
                <ANCProgressTracker completedVisits={3} totalVisits={4} />
                 <ul className="list-disc list-inside text-text-secondary space-y-2 mt-4">
                    <li>Smiling responsively (achieved at 8 weeks)</li>
                    <li>Making cooing sounds (achieved at 10 weeks)</li>
                    <li>Following objects with eyes (achieved at 11 weeks)</li>
                    <li className="text-gray-400">Rolling over (typically 3-4 months)</li>
                </ul>
                <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Milestone recording coming soon!')}>
                       <span className="material-symbols-outlined mr-2">add</span>
                       Record Milestone
                    </Button>
                </div>
            </Card>

            <Card
                title="Teeth Tracking"
                icon={<span className="material-symbols-outlined text-3xl text-yellow-500">dentistry</span>}
            >
                 <p className="text-text-secondary mb-4">Track your baby's teething progress. Tap on a tooth slot to mark a new tooth.</p>
                 <div className="grid grid-cols-2 gap-4">
                    <StatCard value="4" label="Total Teeth" />
                    <StatCard value="Lower Incisor" label="Last Tooth" />
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Interactive teeth tracker coming soon!')}>
                       <span className="material-symbols-outlined mr-2">add</span>
                       Add New Tooth
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default GrowthPage;