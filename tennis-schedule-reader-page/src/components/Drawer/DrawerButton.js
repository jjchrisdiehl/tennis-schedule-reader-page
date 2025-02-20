import { jsx as _jsx } from "react/jsx-runtime";
import cogIcon from "../../assets/cog_white.svg";
import { useSettings } from "../../contexts/SettingsContext";
// Functional component with type annotations
export function DrawerButton() {
    const { dispatch } = useSettings();
    return (_jsx("div", { className: "Drawer__Button", onClick: () => dispatch({ type: "TOGGLE_DRAWER" }), children: _jsx("img", { src: cogIcon, className: "Drawer__Button-Icon", alt: "settings" }) }));
}
