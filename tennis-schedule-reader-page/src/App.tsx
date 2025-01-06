import { useState } from "react";
import "./App.scss";
import bookingResults from "../../api/bookings_result.json";  // JSON data
import { CourtBookings, CourtBookingsData } from "./components/CourtBookings";
import { Drawer } from "../src/components/Drawer";
import { Header } from "../src/components/Layout/Header";
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  // Settings - TODO Abstract this into a provider
  const [is24HrTime, setIs24HrTime] = useState(false);
  const [availableHours, setAvailableHours] = useState<number[]>([6, 22]);

  return (
    <>
      <Header lastUpdateTime={bookingResults[0].lastUpdated} toggleDrawer={toggleDrawer} />
      <Drawer isOpen={isOpen} is24HrTime={is24HrTime} setIs24HrTime={setIs24HrTime} availableHours={availableHours} setAvailableHours={setAvailableHours} />
      <CourtBookings data={bookingResults as unknown as CourtBookingsData[]} is24HrTime={is24HrTime} availableHours={availableHours} />
    </>
  );
};

export default App;