import { timeAgo } from "../../util/helper-functions";
import { useSettings } from "../../contexts/SettingsContext";
import { DrawerButton } from "../Drawer";
import "./header.scss"

export function Header() {
    const {
        isDrawerOpen,
        lastUpdateTime,
    } = useSettings();

    return (
        <div id={"header"}>
            <div>{timeAgo(lastUpdateTime)}</div>
            {!isDrawerOpen && <DrawerButton />}
        </div>
    )
}