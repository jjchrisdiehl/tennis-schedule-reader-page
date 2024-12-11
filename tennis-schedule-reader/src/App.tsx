import "./App.scss";
import bookingResults from "../../api/bookings_result.json";  // JSON data
import { CourtBookings, CourtBookingsData } from "./components/CourtBookings";

const App = () => {
  return <CourtBookings data={bookingResults as unknown as CourtBookingsData[]} />;
};

export default App;