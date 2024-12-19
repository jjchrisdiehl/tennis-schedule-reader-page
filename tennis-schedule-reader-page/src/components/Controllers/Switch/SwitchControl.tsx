import * as Switch from "@radix-ui/react-switch";
import "./SwitchControl.scss";

export function SwitchControl({ onChangeHandler }: { onChangeHandler?: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Switch.Root className="Switch__Root" onCheckedChange={onChangeHandler}>
            <Switch.Thumb className="Switch__Thumb" />
        </Switch.Root>
    )
};