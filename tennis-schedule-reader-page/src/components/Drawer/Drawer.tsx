import Slider from "../Controllers/Slider/Slider";
import { SwitchControl } from "../Controllers/Switch/SwitchControl";
import { DrawerItem } from "./DrawerItem";

// Define the props type for the Drawer component
interface DrawerContentProps {
    is24HrTime: boolean;
    setIs24HrTime: React.Dispatch<React.SetStateAction<boolean>>;
    availableHours: number[];
    setAvailableHours: React.Dispatch<React.SetStateAction<number[]>>;
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

// Define the props type for the Drawer component
interface DrawerProps {
    isOpen: boolean;
    is24HrTime: boolean;
    setIs24HrTime: React.Dispatch<React.SetStateAction<boolean>>;
    availableHours: number[];
    setAvailableHours: React.Dispatch<React.SetStateAction<number[]>>;
}

// Drawer Component
const Drawer: React.FC<DrawerProps> = ({ isOpen, is24HrTime, setIs24HrTime, availableHours, setAvailableHours }) => (
    <div className={`Drawer__Container ${isOpen ? "Drawer__Container--isOpen" : ""}`}>
        <DrawerContents is24HrTime={is24HrTime} setIs24HrTime={setIs24HrTime} availableHours={availableHours} setAvailableHours={setAvailableHours} />
    </div>
);

export { Drawer, DrawerContents };