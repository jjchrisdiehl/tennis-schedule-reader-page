import * as Switch from "@radix-ui/react-switch";
import "./SwitchControl.scss";

export function SwitchControl({ is24HrTime, onChangeHandler }: { is24HrTime: boolean, onChangeHandler?: (checked: boolean) => void }) {
    return (
        <Switch.Root className="Switch__Root" checked={is24HrTime} onCheckedChange={onChangeHandler}>
            <Switch.Thumb className="Switch__Thumb" />
        </Switch.Root>
    )
};