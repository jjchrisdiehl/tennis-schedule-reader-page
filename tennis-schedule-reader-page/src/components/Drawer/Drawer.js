import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AvailabilitySlider, SessionLengthSlider } from "../Controllers/Slider";
import { Is24HrSwitch, NotificationSwitch } from "../Controllers/Switch/";
import { DrawerItem } from "./DrawerItem";
import { useSettings } from '../../contexts/SettingsContext';
import { DrawerButton } from "./DrawerButton";
// DrawerContents Component
const DrawerContents = ({ clearSettings, is24HrTime, setIs24HrTime, availableHours, setAvailableHours, sessionLength, setSessionLength }) => {
    console.log('Drawer state: ', { 'is24:': is24HrTime, 'setis24': setIs24HrTime, 'availableHrs': availableHours, 'setavailablehrs': setAvailableHours });
    return (_jsxs("div", { className: "Drawer__Contents", children: [_jsx("h2", { className: "Drawer__Contents-title", children: "Settings" }), _jsxs("div", { className: "Settings__List", children: [_jsxs(DrawerItem, { children: [_jsx("h3", { className: "ControlGroup__Title", children: "Display time" }), _jsxs("div", { className: "ControlGroup__Item", children: [_jsx("span", { className: "ControlGroup__Label", children: "24 hour time" }), _jsx(Is24HrSwitch, { is24HrTime: is24HrTime, onChangeHandler: setIs24HrTime })] })] }), _jsxs(DrawerItem, { children: [_jsx("h3", { className: "ControlGroup__Title", children: "Availability" }), _jsxs("div", { className: "ControlGroup__Item stacked", children: [_jsx("span", { className: "ControlGroup__Label", children: "Set your availability" }), _jsx(AvailabilitySlider, { min: 6, max: 22, step: .5, defaultValues: [6, 22], is24HrTime: is24HrTime, availableHours: availableHours, setAvailableHours: setAvailableHours })] })] }), _jsxs(DrawerItem, { children: [_jsx("h3", { className: "ControlGroup__Title", children: "Session length" }), _jsxs("div", { className: "ControlGroup__Item stacked", children: [_jsx("span", { className: "ControlGroup__Label", children: "Choose length of session" }), _jsx(SessionLengthSlider, { min: .5, max: 3, step: .5, defaultValues: [.5, 3], sessionLength: sessionLength, setSessionLength: setSessionLength })] })] }), _jsx("a", { className: "drawer-button__clear-settings", type: "button", onClick: clearSettings, children: "Clear all" })] })] }));
};
// Drawer Component
const Drawer = () => {
    const { is24HrTime, availableHours, isDrawerOpen, sessionLength, dispatch } = useSettings();
    return (_jsxs("div", { className: `Drawer__Container ${isDrawerOpen ? "Drawer__Container--isOpen" : ""}`, children: [_jsx("div", { className: "Drawer__Header", children: isDrawerOpen && _jsx(DrawerButton, {}) }), _jsx(DrawerContents, { clearSettings: () => dispatch({ type: "CLEAR_SETTINGS" }), is24HrTime: is24HrTime, setIs24HrTime: (newValue) => {
                    console.log("Updating is24HrTime:", newValue);
                    dispatch({ type: "SET_24HR_TIME", payload: newValue });
                }, availableHours: availableHours, setAvailableHours: (newHours) => dispatch({ type: "SET_AVAILABLE_HOURS", payload: [...newHours] }), sessionLength: sessionLength, setSessionLength: (newHours) => dispatch({ type: "SET_SESSION_LENGTH", payload: [...newHours] }) }), _jsx("div", { className: "Drawer__Footer", children: _jsxs("div", { className: "ControlGroup__Item", children: [_jsx("span", { className: "ControlGroup__Label", children: "Notifications" }), _jsx(NotificationSwitch, {})] }) })] }));
};
export { Drawer, DrawerContents };
