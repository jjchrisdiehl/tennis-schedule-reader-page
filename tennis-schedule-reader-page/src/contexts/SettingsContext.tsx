import { createContext, Dispatch } from "react";
import { SettingsState, SettingsAction } from "./settingsReducer";
import { useContext } from "react";

// Context Type
export type SettingsContextType = SettingsState & {
  dispatch: Dispatch<SettingsAction>;
  lastUpdateTime: string;
};

// Create Context
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);


export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};