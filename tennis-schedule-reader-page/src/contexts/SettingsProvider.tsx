import React, { useReducer, useEffect } from "react";
import { SettingsContext } from "./SettingsContext";
import { defaultSettingsState, settingsReducer, SettingsState } from "./settingsReducer";

const STORAGE_KEY = "appSettings"; // Key for localStorage

export const SettingsProvider: React.FC<{ children: React.ReactNode; lastUpdateTime: string }> = ({ children, lastUpdateTime }) => {
    // Load from localStorage or use default state
    const getInitialState = (): SettingsState => {
        const savedSettings = localStorage.getItem(STORAGE_KEY);
        return savedSettings ? JSON.parse(savedSettings) : defaultSettingsState;
    };

    const [state, dispatch] = useReducer(settingsReducer, undefined, getInitialState);

    // Save to localStorage whenever state updates
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    return (
        <SettingsContext.Provider value={{ ...state, dispatch, lastUpdateTime }}>
            {children}
        </SettingsContext.Provider>
    );
};