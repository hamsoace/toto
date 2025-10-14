import { createContext, useState, useContext } from 'react';
import AchievementCelebration from '../components/AchievementCelebration';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newAchievement, setNewAchievement] = useState(null);

  const login = async (userData) => {
    setUser(userData);

    // Check for achievements in response
    if (userData.newAchievement) {
      setNewAchievement(userData.newAchievement);
    }
  };

  // Add logout function to clear user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}

      {/* Show achievement celebration */}
      <AchievementCelebration
        achievement={newAchievement}
        onClose={() => setNewAchievement(null)}
      />
    </AuthContext.Provider>
  );
};

// ✅ Add and export useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
