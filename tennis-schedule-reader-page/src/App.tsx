import "./App.scss";
import bookingResults from "../../api/bookings_result.json";  // JSON data
import { CourtBookings, CourtBookingsData } from "./components/CourtBookings";
import { Drawer } from "../src/components/Drawer";
import { Header } from "../src/components/Layout/Header";
import { SettingsProvider } from "./contexts/SettingsProvider";

const App = () => {

  return (
    <SettingsProvider lastUpdateTime={bookingResults[0].lastUpdated}>
      <Header />
      <Drawer />
      <CourtBookings data={bookingResults as unknown as CourtBookingsData[]} />
    </SettingsProvider>
  );
};

export default App;