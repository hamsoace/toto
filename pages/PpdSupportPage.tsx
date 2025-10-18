import React, { useState } from 'react';
import Card from '../components/Card';
import TipCard from '../components/TipCard';
import Button from '../components/Button';

const PpdSupportPage: React.FC = () => {
    const [showSymptoms, setShowSymptoms] = useState(false);
    
    return (
        <div className="space-y-6">
             <Card
                title="Postpartum Depression Support"
                icon={<span className="material-symbols-outlined text-3xl text-purple-500">psychology</span>}
            >
                <p className="text-text-secondary mb-4">1 in 7 women experience postpartum depression. You are not alone, and help is available.</p>
                <div className="my-4 p-4 rounded-lg bg-danger text-white text-center">
                    <h4 className="font-bold text-lg">Need Immediate Help?</h4>
                    <p className="text-sm opacity-90 mt-1">If you're having thoughts of harming yourself or your baby, call the Kenya Mental Health Hotline.</p>
                    <a href="tel:116" className="font-bold text-2xl block my-2">116</a>
                    <p className="text-xs">Available 24/7 • Free • Confidential</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button onClick={() => setShowSymptoms(!showSymptoms)} className="flex flex-col items-center p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition">
                         <span className="material-symbols-outlined text-3xl">clinical_notes</span>
                         <span className="text-sm font-semibold mt-2">PPD Symptoms</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition">
                         <span className="material-symbols-outlined text-3xl">self_care</span>
                         <span className="text-sm font-semibold mt-2">Self-Care Tips</span>
                    </button>
                </div>
            </Card>

            {showSymptoms && (
                 <Card title="Common PPD Symptoms">
                     <ul className="space-y-2 text-text-secondary">
                        <li className="flex items-start"><span className="material-symbols-outlined text-purple-500 mr-2">check</span> Persistent sadness, anxiety, or "empty" mood</li>
                        <li className="flex items-start"><span className="material-symbols-outlined text-purple-500 mr-2">check</span> Loss of interest or pleasure in activities</li>
                        <li className="flex items-start"><span className="material-symbols-outlined text-purple-500 mr-2">check</span> Difficulty bonding with your baby</li>
                        <li className="flex items-start"><span className="material-symbols-outlined text-purple-500 mr-2">check</span> Changes in appetite or sleep patterns</li>
                        <li className="flex items-start"><span className="material-symbols-outlined text-purple-500 mr-2">check</span> Excessive crying or irritability</li>
                        <li className="flex items-start"><span className="material-symbols-outlined text-purple-500 mr-2">check</span> Feelings of guilt, worthlessness, or hopelessness</li>
                        <li className="flex items-start"><span className="material-symbols-outlined text-purple-500 mr-2">check</span> Thoughts of harming yourself or your baby</li>
                     </ul>
                    <TipCard title="Important Note" variant="ppd" className="mt-4">
                        <p>These symptoms are not a sign of weakness or failure. They are a medical condition that requires treatment.</p>
                    </TipCard>
                </Card>
            )}

        </div>
    );
};

export default PpdSupportPage;
