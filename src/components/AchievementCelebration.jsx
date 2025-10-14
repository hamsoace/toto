import { useEffect, useState } from 'react';
import './AchievementCelebration.css';

const AchievementCelebration = ({ achievement, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (achievement) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!show || !achievement) return null;

  return (
    <div className="achievement-celebration">
      <div className="celebration-content">
        <div className="confetti"></div>
        <div className="badge-icon">🎉</div>
        <h3>Achievement Unlocked!</h3>
        <h4>{achievement.achievement}</h4>
        <p>{achievement.description}</p>
        <div className="reward-info">
          <span className="points">+{achievement.points} points</span>
          <span className="badge">{achievement.badge}</span>
        </div>
      </div>
    </div>
  );
};

export default AchievementCelebration;