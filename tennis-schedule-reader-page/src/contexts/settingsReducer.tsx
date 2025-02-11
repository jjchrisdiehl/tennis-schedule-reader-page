export type SettingsState = {
    is24HrTime: boolean;
    availableHours: number[];
    isDrawerOpen: boolean;
    sessionLength: number[];
};

// Define the default state outside the reducer
export const defaultSettingsState: SettingsState = {
    is24HrTime: false,
    availableHours: [6, 22],
    isDrawerOpen: false,
    sessionLength: [.5, 3],
};

export type SettingsAction =
    | { type: "SET_24HR_TIME"; payload: boolean }
    | { type: "SET_AVAILABLE_HOURS"; payload: number[] }
    | { type: "SET_SESSION_LENGTH"; payload: number[] }
    | { type: "TOGGLE_DRAWER" }
    | { type: "CLEAR_SETTINGS" };

export const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
    switch (action.type) {
        case "SET_24HR_TIME":
            return { ...state, is24HrTime: action.payload };
        case "SET_AVAILABLE_HOURS":
            return { ...state, availableHours: action.payload };
        case "SET_SESSION_LENGTH":
            return { ...state, sessionLength: action.payload };
        case "TOGGLE_DRAWER":
            return { ...state, isDrawerOpen: !state.isDrawerOpen };
        case "CLEAR_SETTINGS":
            return { ...defaultSettingsState, isDrawerOpen: state.isDrawerOpen }
        default:
            return state;
    }
};