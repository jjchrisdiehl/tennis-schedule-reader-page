import { jsx as _jsx } from "react/jsx-runtime";
import * as Switch from "@radix-ui/react-switch";
import "./SwitchControl.scss";
import useNotification from "../../../hooks/useNotification";
export function NotificationSwitch() {
    const { isSubscribed, requestPermissionAndSubscribe, unsubscribeFromNotifications } = useNotification();
    const handleToggle = async () => {
        if (isSubscribed) {
            await unsubscribeFromNotifications();
        }
        else {
            await requestPermissionAndSubscribe();
        }
    };
    return (_jsx(Switch.Root, { className: "Switch__Root", checked: isSubscribed, onCheckedChange: handleToggle, children: _jsx(Switch.Thumb, { className: "Switch__Thumb" }) }));
}
