import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import PregnancyTrackerPage from './PregnancyTrackerPage';
import DashboardPage from './DashboardPage';
import GrowthPage from './GrowthPage';
import EducationPage from './EducationPage';
import PpdSupportPage from './PpdSupportPage';
import ProfilePage from './ProfilePage';
import BottomNav, { Section } from '../components/BottomNav';

const MainLayout: React.FC = () => {
    const { userData } = useUser();
    const [activeSection, setActiveSection] = useState<Section>('dashboard');
    
    if (!userData) return null;

    const isMom = userData.parentType === 'mum';
    const themeColor = isMom ? 'bg-mom-pink' : 'bg-totocare-blue';
    const welcomeName = userData.name.split(' ')[0];

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardPage />;
            case 'pregnancy':
                return <PregnancyTrackerPage />;
            case 'growth':
                return <GrowthPage />;
            case 'education':
                return <EducationPage />;
            case 'support':
                return <PpdSupportPage />;
            case 'profile':
                return <ProfilePage />;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <div className={`min-h-screen bg-background font-sans text-text-primary theme-${userData.parentType}`}>
            <header className={`${themeColor} shadow-md sticky top-0 z-10`}>
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold text-white">Toto Care</h1>
                    </div>
                    <div className="flex items-center">
                    <span className="text-white font-semibold">Welcome, {welcomeName}!</span>
                    </div>
                </div>
                </nav>
            </header>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8 pb-24">
                {renderSection()}
            </main>
            
            <BottomNav activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
    );
};

export default MainLayout;