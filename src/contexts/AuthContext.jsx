import { createContext, useState, useContext } from 'react';
import AchievementCelebration from '../components/AchievementCelebration'; // ADD THIS

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newAchievement, setNewAchievement] = useState(null); // ADD THIS STATE

  const login = async (userData) => {
    setUser(userData);
    
    // CHECK FOR ACHIEVEMENTS IN RESPONSE
    if (userData.newAchievement) {
      setNewAchievement(userData.newAchievement);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      {/* ADD ACHIEVEMENT CELEBRATION COMPONENT */}
      <AchievementCelebration 
        achievement={newAchievement}
        onClose={() => setNewAchievement(null)}
      />
    </AuthContext.Provider>
  );
};