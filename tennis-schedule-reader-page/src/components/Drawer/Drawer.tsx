import { AvailabilitySlider, SessionLengthSlider } from "../Controllers/Slider";
import { SwitchControl } from "../Controllers/Switch/SwitchControl";
import { DrawerItem } from "./DrawerItem";
import { useSettings } from '../../contexts/SettingsContext';

// Define the props type for the Drawer component
interface DrawerContentProps {
    clearSettings: () => void;
    is24HrTime: boolean;
    setIs24HrTime: (checked: boolean) => void;
    availableHours: number[];
    setAvailableHours: (newHours: number[]) => void;
    sessionLength: number[];
    setSessionLength: (newHours: number[]) => void;
}

// DrawerContents Component
const DrawerContents: React.FC<DrawerContentProps> = ({ clearSettings, is24HrTime, setIs24HrTime, availableHours, setAvailableHours, sessionLength, setSessionLength }) => {
    console.log('Drawer state: ', { 'is24:': is24HrTime, 'setis24': setIs24HrTime, 'availableHrs': availableHours, 'setavailablehrs': setAvailableHours })
    return (
        <div className="Drawer__Contents">
            <h2>Settings</h2>
            <div className="Settings__List">
                <DrawerItem>
                    <h3 className="ControlGroup__Title">Display time</h3>
                    <div className="ControlGroup__Item">
                        <span className="ControlGroup__Label">24 hour time</span>
                        <SwitchControl is24HrTime={is24HrTime} onChangeHandler={setIs24HrTime} />
                    </div>
                </DrawerItem>
                <DrawerItem>
                    <h3 className="ControlGroup__Title">Availability</h3>
                    <div className="ControlGroup__Item stacked">
                        <span className="ControlGroup__Label">Set your availability</span>
                        <AvailabilitySlider min={6} max={22} step={.5} defaultValues={[6, 22]} is24HrTime={is24HrTime} availableHours={availableHours} setAvailableHours={setAvailableHours} />
                    </div>
                </DrawerItem>
                <DrawerItem>
                    <h3 className="ControlGroup__Title">Session length</h3>
                    <div className="ControlGroup__Item stacked">
                        <span className="ControlGroup__Label">Choose length of session</span>
                        <SessionLengthSlider min={.5} max={3} step={.5} defaultValues={[.5, 3]} sessionLength={sessionLength} setSessionLength={setSessionLength} />
                    </div>
                </DrawerItem>
                <a className="drawer-button__clear-settings" type="button" onClick={clearSettings}>Clear all</a>
            </div>
        </div>
    )
};


// Drawer Component
const Drawer = () => {
    const { is24HrTime, availableHours, isDrawerOpen, sessionLength, dispatch } = useSettings();

    return (
        <div className={`Drawer__Container ${isDrawerOpen ? "Drawer__Container--isOpen" : ""}`}>
            <DrawerContents
                clearSettings={() => dispatch({ type: "CLEAR_SETTINGS" })}
                is24HrTime={is24HrTime}
                setIs24HrTime={(newValue: boolean) => {
                    console.log("Updating is24HrTime:", newValue);
                    dispatch({ type: "SET_24HR_TIME", payload: newValue })
                }}
                availableHours={availableHours}
                setAvailableHours={(newHours: number[]) => dispatch({ type: "SET_AVAILABLE_HOURS", payload: [...newHours] })}
                sessionLength={sessionLength}
                setSessionLength={(newHours: number[]) => dispatch({ type: "SET_SESSION_LENGTH", payload: [...newHours] })} />

        </div>
    )
};

export { Drawer, DrawerContents };