import Slider from "../Controllers/Slider/Slider";
import { SwitchControl } from "../Controllers/Switch/SwitchControl";
import { DrawerItem } from "./DrawerItem";
import { useSettings } from '../../contexts/SettingsContext';
import { SetStateAction } from "react";

// Define the props type for the Drawer component
interface DrawerContentProps {
    is24HrTime: boolean;
    setIs24HrTime: React.Dispatch<SetStateAction<boolean>>;
    availableHours: number[];
    setAvailableHours: (newHours: number[]) => void; // Change here
}

// DrawerContents Component
const DrawerContents: React.FC<DrawerContentProps> = ({ is24HrTime, setIs24HrTime, availableHours, setAvailableHours }) => {
    return (
        <div className="Drawer__Contents">
            <h2>Settings</h2>
            <div className="Settings__List">
                <DrawerItem>
                    <h3 className="ControlGroup__Title">Display time</h3>
                    <div className="ControlGroup__Item">
                        <span className="ControlGroup__Label">24 hour time</span>
                        <SwitchControl onChangeHandler={setIs24HrTime} />
                    </div>
                </DrawerItem>
                <DrawerItem>
                    <h3 className="ControlGroup__Title">Availability</h3>
                    <div className="ControlGroup__Item stacked">
                        <span className="ControlGroup__Label">Set your availability</span>
                        <Slider min={6} max={22} step={.5} defaultValues={[6, 22]} is24HrTime={is24HrTime} availableHours={availableHours} setAvailableHours={setAvailableHours} />
                    </div>
                </DrawerItem>
            </div>
        </div>
    )
};


// Drawer Component
const Drawer = () => {
    const { is24HrTime, availableHours, isDrawerOpen, dispatch } = useSettings();

    return (
        <div className={`Drawer__Container ${isDrawerOpen ? "Drawer__Container--isOpen" : ""}`}>
            <DrawerContents
                is24HrTime={is24HrTime}
                setIs24HrTime={() => dispatch({ type: "SET_24HR_TIME", payload: !is24HrTime })}
                availableHours={availableHours}
                setAvailableHours={(newHours: number[]) => dispatch({ type: "SET_AVAILABLE_HOURS", payload: [...newHours] })} />    </div>
    )
};

export { Drawer, DrawerContents };