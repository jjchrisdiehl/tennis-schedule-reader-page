import { timeAgo } from "../../util/helper-functions";
import { useSettings } from "../../contexts/SettingsContext";


export function Header() {
    const {
        lastUpdateTime,
    } = useSettings();

    return (
        <div id={"header"}>
            <div>{timeAgo(lastUpdateTime)}</div>
        </div>
    )
}