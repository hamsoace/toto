import React from 'react';
import { useUser } from '../context/UserContext';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Button from '../components/Button';

const ProfilePage: React.FC = () => {
    const { userData, setUserData } = useUser();
    
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out and clear your data?")) {
            setUserData(null);
        }
    }

    return (
        <div className="space-y-6">
            <Card
                title="Your Profile"
                icon={<span className="material-symbols-outlined text-3xl text-totocare-blue">person</span>}
            >
                <div className="text-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-4xl text-text-secondary font-bold">
                        {userData?.name.charAt(0)}
                    </div>
                    <h3 className="text-2xl font-bold mt-2">{userData?.name}</h3>
                    <p className="text-text-secondary">{userData?.parentType === 'mum' ? 'Mother' : 'Father'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <StatCard value="12" label="Achievements" />
                    <StatCard value="1,245" label="Total Points" />
                </div>
            </Card>
            
            <Card
                title="App Settings"
                icon={<span className="material-symbols-outlined text-3xl text-gray-500">settings</span>}
            >
                <p className="text-text-secondary mb-4">Customize your TotoCare experience.</p>
                <div className="flex justify-end">
                    <Button onClick={handleLogout} variant="danger">
                        Logout & Reset App
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;