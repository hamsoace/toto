import React from 'react';
import { Badge } from '../types';
import Card from './Card';
import Button from './Button';
import { useUser } from '../context/UserContext';

const mockBadges: Badge[] = [
    { id: 'first_step', name: 'First Step', icon: 'check_circle', earned: true },
    { id: 'feeding_expert', name: 'Feeding Expert', icon: 'restaurant', earned: true },
    { id: 'vaccination_hero', name: 'Vaccine Hero', icon: 'vaccines', earned: true },
    { id: 'sleep_master', name: 'Sleep Master', icon: 'hotel', earned: false },
    { id: 'growth_tracker', name: 'Growth Tracker', icon: 'height', earned: false },
    { id: 'community_star', name: 'Community Star', icon: 'groups', earned: false },
];

const BadgeItem: React.FC<{ badge: Badge }> = ({ badge }) => {
    return (
        <div className="flex-shrink-0 w-20 text-center">
            <div className={`relative w-16 h-16 mx-auto rounded-full flex items-center justify-center ${badge.earned ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>
                <span className="material-symbols-outlined text-3xl">{badge.icon}</span>
                {!badge.earned && (
                     <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="material-symbols-outlined text-sm text-white">lock</span>
                    </div>
                )}
            </div>
            <p className="text-xs font-semibold mt-2 text-text-primary">{badge.name}</p>
        </div>
    )
}

const BadgesOverview: React.FC = () => {
    const { userData } = useUser();
    const isMom = userData?.parentType === 'mum';
    const iconColor = isMom ? 'text-mom-pink' : 'text-totocare-blue';

    return (
        <Card
            title="Your Badges"
            icon={<span className={`material-symbols-outlined text-3xl ${iconColor}`}>military_tech</span>}
            footerContent={
                 <div className="flex justify-end">
                    <Button variant='secondary' onClick={() => alert('Badge collection page coming soon!')}>
                       <span className="material-symbols-outlined mr-2">emoji_events</span>
                       View All Badges
                    </Button>
                </div>
            }
        >
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
                {mockBadges.map(badge => <BadgeItem key={badge.id} badge={badge} />)}
            </div>
        </Card>
    );
};

export default BadgesOverview;