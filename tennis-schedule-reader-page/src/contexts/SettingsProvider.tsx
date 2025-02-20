import React, { useReducer, useEffect, useState } from "react";
import { SettingsContext } from "./SettingsContext";
import { defaultSettingsState, settingsReducer, SettingsState } from "./settingsReducer";
import { getSettings, saveSettings } from "../util/indexedDB";

export const SettingsProvider: React.FC<{ children: React.ReactNode; lastUpdateTime: string }> = ({ children, lastUpdateTime }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const getInitialState = async (): Promise<SettingsState> => {
        const savedSettings = await getSettings();
        return savedSettings || defaultSettingsState;
    };

    const [state, dispatch] = useReducer(settingsReducer, defaultSettingsState);

    useEffect(() => {
        getInitialState().then((initialState) => {
            dispatch({ type: "LOAD_SETTINGS", payload: initialState });
            setIsLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveSettings(state);
        }
    }, [state, isLoaded]);

    if (!isLoaded) return null; // Prevent rendering until settings are loaded

    return (
        <SettingsContext.Provider value={{ ...state, dispatch, lastUpdateTime }}>
            {children}
        </SettingsContext.Provider>
    );
};