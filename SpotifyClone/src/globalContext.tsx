import React, {createContext, useContext, useState, ReactNode} from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Global application context
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Function to switch theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{theme, toggleTheme}}>
      {children}
    </AppContext.Provider>
  );
};

// Hook for using the theme
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
