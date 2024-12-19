import { useState } from "react";
import "./App.scss";
import bookingResults from "../../api/bookings_result.json";  // JSON data
import { CourtBookings, CourtBookingsData } from "./components/CourtBookings";
import { Drawer, DrawerButton } from "../src/components/Drawer";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  // Settings - TODO Abstract this into a provider
  const [is24HrTime, setIs24HrTime] = useState(false);
  const [availableHours, setAvailableHours] = useState<number[]>([6, 22]);

  return (
    <>
      <DrawerButton onClick={toggleDrawer} />
      <Drawer isOpen={isOpen} is24HrTime={is24HrTime} setIs24HrTime={setIs24HrTime} availableHours={availableHours} setAvailableHours={setAvailableHours} />
      <CourtBookings data={bookingResults as unknown as CourtBookingsData[]} is24HrTime={is24HrTime} availableHours={availableHours} />
    </>
  );
};

export default App;