import React from 'react';
import Card from '../components/Card';
import TipCard from '../components/TipCard';
import Button from '../components/Button';
import StatCard from '../components/StatCard';

const EducationPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Card
                title="Health Education"
                icon={<span className="material-symbols-outlined text-3xl text-totocare-blue">school</span>}
            >
                <p className="text-text-secondary mb-4">Learn about important health topics for you and your baby.</p>
                <div className="grid grid-cols-2 gap-4">
                    <StatCard value="12" label="Articles Read" />
                    <StatCard value="5" label="Videos Watched" />
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Educational topics coming soon!')}>
                       <span className="material-symbols-outlined mr-2">menu_book</span>
                       Browse Topics
                    </Button>
                </div>
            </Card>

            <Card
                title="Breastfeeding Support"
                icon={<span className="material-symbols-outlined text-3xl text-green-500">restaurant</span>}
            >
                <p className="text-text-secondary mb-4">Kenya's Ministry of Health recommends exclusive breastfeeding for the first 6 months, followed by continued breastfeeding up to 2 years or beyond.</p>
                <TipCard
                    title="Important Notice"
                    icon={<span className="material-symbols-outlined text-danger">emergency</span>}
                >
                     <p>Newborns need to feed 8-12 times per day. Feeding only when you eat (3 times daily) can lead to severe dehydration and organ failure.</p>
                </TipCard>
                <div className="mt-4 flex justify-end">
                    <Button onClick={() => alert('Support resources coming soon!')}>
                       <span className="material-symbols-outlined mr-2">support_agent</span>
                       Get Support
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default EducationPage;