import { DrawerButton } from "../Drawer";
import { timeAgo } from "../../util/helper-functions";
import { useSettings } from "../../contexts/SettingsContext";


export function Header() {
    const {
        isDrawerOpen,
        setIsDrawerOpen,
        lastUpdateTime,
    } = useSettings();

    return (
        <div id={"header"}>
            <div>{timeAgo(lastUpdateTime)}</div>
            <DrawerButton onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
        </div>
    )
}