import React from 'react';
import { useUser } from '../context/UserContext';

export type Section = 'dashboard' | 'pregnancy' | 'growth' | 'education' | 'support' | 'profile';

interface BottomNavProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const navItems: { id: Section; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Home', icon: 'home' },
    { id: 'pregnancy', label: 'Pregnancy', icon: 'pregnant_woman' },
    { id: 'growth', label: 'Growth', icon: 'show_chart' },
    { id: 'education', label: 'Learn', icon: 'school' },
    { id: 'support', label: 'Support', icon: 'favorite' },
    { id: 'profile', label: 'Profile', icon: 'person' },
];

const NavItem: React.FC<{
    item: typeof navItems[0],
    isActive: boolean,
    onClick: () => void,
    activeColor: string,
    activeBgColor: string
}> = ({ item, isActive, onClick, activeColor, activeBgColor }) => {

    const activeClasses = `${activeColor} ${activeBgColor}`;
    const inactiveClasses = 'text-text-secondary';

    return (
         <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex flex-col items-center justify-center text-center w-full pt-2 pb-1 transition-colors duration-200 rounded-lg ${isActive ? activeClasses : inactiveClasses}`}
        >
            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            <span className="text-xs font-medium mt-1">{item.label}</span>
        </a>
    )
}

const BottomNav: React.FC<BottomNavProps> = ({ activeSection, setActiveSection }) => {
    const { userData } = useUser();
    const isMom = userData?.parentType === 'mum';

    const activeColor = isMom ? 'text-mom-pink' : 'text-totocare-blue';
    const activeBgColor = isMom ? 'bg-pink-50' : 'bg-totocare-blue-light';
    
    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
            <div className="container mx-auto h-full">
                <div className="flex justify-around items-center h-full px-2">
                    {navItems.map(item => (
                        <NavItem 
                            key={item.id}
                            item={item}
                            isActive={activeSection === item.id}
                            onClick={() => setActiveSection(item.id)}
                            activeColor={activeColor}
                            activeBgColor={activeBgColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BottomNav;