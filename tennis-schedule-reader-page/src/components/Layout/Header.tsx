import { DrawerButton } from "../Drawer";
import { timeAgo } from "../../util/helper-functions";

interface HeaderProps {
    lastUpdateTime: string;
    toggleDrawer: () => void;
}

export function Header({ lastUpdateTime, toggleDrawer }: HeaderProps) {

    return (
        <div id={"header"}>
            <div>{timeAgo(lastUpdateTime)}</div>
            <DrawerButton onClick={toggleDrawer} />
        </div>
    )
}