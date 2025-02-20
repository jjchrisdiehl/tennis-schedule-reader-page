import * as Switch from "@radix-ui/react-switch";
import "./SwitchControl.scss";
import useNotification from "../../../hooks/useNotification";

export function NotificationSwitch() {
    const { isSubscribed, requestPermissionAndSubscribe, unsubscribeFromNotifications } = useNotification();

    const handleToggle = async () => {
        if (isSubscribed) {
            await unsubscribeFromNotifications();
        } else {
            await requestPermissionAndSubscribe();
        }
    };

    return (
        <Switch.Root className="Switch__Root" checked={isSubscribed} onCheckedChange={handleToggle}>
            <Switch.Thumb className="Switch__Thumb" />
        </Switch.Root>
    );
}