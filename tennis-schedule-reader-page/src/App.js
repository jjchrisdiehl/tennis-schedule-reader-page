import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.scss";
import bookingResults from "../../api/bookings_result.json"; // JSON data
import { CourtBookings } from "./components/CourtBookings";
import { Drawer } from "../src/components/Drawer";
import { Header } from "../src/components/Layout/Header";
import { SettingsProvider } from "./contexts/SettingsProvider";
import useNotification from "./hooks/useNotification";
const App = () => {
    useNotification();
    return (_jsxs(SettingsProvider, { lastUpdateTime: bookingResults[0].lastUpdated, children: [_jsx(Header, {}), _jsx(Drawer, {}), _jsx(CourtBookings, { data: bookingResults })] }));
};
export default App;
