import { createContext } from "react";
import { useContext } from "react";
// Create Context
export const SettingsContext = createContext(undefined);
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
