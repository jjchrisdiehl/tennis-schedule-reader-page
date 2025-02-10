import cogIcon from "../../assets/cog_white.svg";
import { useSettings } from "../../contexts/SettingsContext";

// Functional component with type annotations
export function DrawerButton(): JSX.Element {

    const { dispatch } = useSettings();

    return (
        <div className="Drawer__Button" onClick={() => dispatch({ type: "TOGGLE_DRAWER" })}>
            <img src={cogIcon} className="Drawer__Button-Icon" alt="settings"></img>
        </div>
    );
}