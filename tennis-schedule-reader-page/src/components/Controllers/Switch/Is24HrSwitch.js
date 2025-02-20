import { jsx as _jsx } from "react/jsx-runtime";
import * as Switch from "@radix-ui/react-switch";
import "./SwitchControl.scss";
export function Is24HrSwitch({ is24HrTime, onChangeHandler }) {
    return (_jsx(Switch.Root, { className: "Switch__Root", checked: is24HrTime, onCheckedChange: onChangeHandler, children: _jsx(Switch.Thumb, { className: "Switch__Thumb" }) }));
}
;
