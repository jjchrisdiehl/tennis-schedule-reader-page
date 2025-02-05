// src/contexts/SettingsContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';


// Define types for the context value
interface SettingsContextType {
  is24HrTime: boolean;
  setIs24HrTime: React.Dispatch<React.SetStateAction<boolean>>;
  availableHours: number[];
  setAvailableHours: React.Dispatch<React.SetStateAction<number[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lastUpdateTime: string;
}

// Create the context with default values
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Define types for provider props

interface SettingsProviderType {
  children: ReactNode,
  lastUpdateTime: string,
}

// Provider component
export const SettingsProvider: React.FC<SettingsProviderType> = ({ children, lastUpdateTime }) => {
  const [is24HrTime, setIs24HrTime] = useState(false);
  const [availableHours, setAvailableHours] = useState<number[]>([6, 22]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <SettingsContext.Provider value={{ is24HrTime, setIs24HrTime, availableHours, setAvailableHours, isDrawerOpen, setIsDrawerOpen, lastUpdateTime }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};