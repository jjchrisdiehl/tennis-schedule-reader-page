// Define the default state outside the reducer
export const defaultSettingsState = {
    is24HrTime: false,
    availableHours: [6, 22],
    isDrawerOpen: false,
    sessionLength: [0.5, 3],
};
export const settingsReducer = (state, action) => {
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
            return { ...defaultSettingsState, isDrawerOpen: state.isDrawerOpen };
        case "LOAD_SETTINGS": // ✅ Handle initial settings load
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
