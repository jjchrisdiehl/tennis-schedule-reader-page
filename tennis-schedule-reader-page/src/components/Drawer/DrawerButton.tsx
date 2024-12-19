import cogIcon from "../../assets/cog_white.svg";

// Define the props type for the component
interface DrawerButtonProps {
    onClick: () => void; // onClick is a function that takes no arguments and returns void
}

// Functional component with type annotations
export function DrawerButton({ onClick }: DrawerButtonProps): JSX.Element {
    return (
        <div className="Drawer__Button" onClick={onClick}>
            <img src={cogIcon} className="Drawer__Button-Icon" alt="settings"></img>
        </div>
    );
}