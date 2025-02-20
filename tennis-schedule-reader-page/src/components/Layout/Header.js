import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { timeAgo } from "../../util/helper-functions";
import { useSettings } from "../../contexts/SettingsContext";
import { DrawerButton } from "../Drawer";
import "./header.scss";
export function Header() {
    const { isDrawerOpen, lastUpdateTime, } = useSettings();
    return (_jsxs("div", { id: "header", children: [_jsx("div", { children: timeAgo(lastUpdateTime) }), !isDrawerOpen && _jsx(DrawerButton, {})] }));
}
