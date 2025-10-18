import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatCard from '../components/StatCard';

const ClinicsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Card
                title="Find Nearby Clinics"
                icon={<span className="material-symbols-outlined text-3xl text-totocare-blue">local_hospital</span>}
            >
                <p className="text-text-secondary mb-4">Find healthcare facilities near your current location:</p>
                <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                        <div className="font-bold text-text-primary">Nairobi Hospital</div>
                        <div className="text-sm text-text-secondary">Mother & Child Center • Open 24 hours</div>
                        <span className="text-xs font-semibold text-totocare-blue bg-totocare-blue-light px-2 py-1 rounded-full mt-2 inline-block">2.3 km away</span>
                    </div>
                    <div className="p-3 border rounded-lg">
                        <div className="font-bold text-text-primary">Aga Khan University Hospital</div>
                        <div className="text-sm text-text-secondary">Pediatric Department • Open 24 hours</div>
                         <span className="text-xs font-semibold text-totocare-blue bg-totocare-blue-light px-2 py-1 rounded-full mt-2 inline-block">3.1 km away</span>
                    </div>
                     <div className="p-3 border rounded-lg">
                        <div className="font-bold text-text-primary">Mater Hospital</div>
                        <div className="text-sm text-text-secondary">Child Health Clinic • Open until 8 PM</div>
                         <span className="text-xs font-semibold text-totocare-blue bg-totocare-blue-light px-2 py-1 rounded-full mt-2 inline-block">1.8 km away</span>
                    </div>
                </div>
                 <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Map view for clinics coming soon!')}>
                       <span className="material-symbols-outlined mr-2">location_on</span>
                       View More Clinics
                    </Button>
                </div>
            </Card>

            <Card
                title="Community Support"
                icon={<span className="material-symbols-outlined text-3xl text-yellow-500">groups</span>}
            >
                <p className="text-text-secondary mb-4">Connect with other parents and healthcare professionals:</p>
                <div className="grid grid-cols-2 gap-4">
                    <StatCard value="3" label="Support Groups" />
                    <StatCard value="12" label="Active Members" />
                </div>
                 <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Community forum coming soon!')}>
                       <span className="material-symbols-outlined mr-2">chat</span>
                       Join Conversation
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ClinicsPage;