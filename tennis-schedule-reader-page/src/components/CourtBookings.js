import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSettings } from "../contexts/SettingsContext";
import { Booking } from "./Booking";
export function CourtBookings({ data, }) {
    const { is24HrTime, availableHours, sessionLength } = useSettings();
    function formatDate(dateString) {
        const date = new Date(Number(dateString.substring(0, 4)), Number(dateString.substring(4, 6)) - 1, Number(dateString.substring(6)));
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }
    function isBookingWithinAvailableHours(booking, availableHours) {
        const [from, to] = availableHours;
        return (Number(booking.start_time) >= from &&
            Number(booking.end_time) <= to);
    }
    function isBookingWithinSessionLength(booking, sessionLength) {
        if (!Array.isArray(sessionLength)) {
            console.error("Invalid sessionLength value:", sessionLength);
            return false;
        }
        const [short, long = 3] = sessionLength;
        return Number(booking.available_time) >= short && Number(booking.available_time) <= long;
    }
    return (_jsx("div", { children: data.map((dayData, index) => {
            // Check if there are any bookings for the day across all courts after applying filters
            const hasBookings = dayData["Court Bookings"].some((court) => {
                const courtName = Object.keys(court)[0];
                const courtBookings = court[courtName];
                return courtBookings.some((booking) => isBookingWithinAvailableHours(booking, availableHours));
            });
            return (_jsxs("div", { className: "day-booking", children: [_jsx("h2", { className: "day-booking__date-header", children: formatDate(String(dayData.date)) }), hasBookings ? (_jsx("ul", { className: "courts schedule", children: dayData["Court Bookings"].map((court, idx) => {
                            const courtName = Object.keys(court)[0];
                            const bookings = court[courtName].filter((booking) => isBookingWithinAvailableHours(booking, availableHours) &&
                                isBookingWithinSessionLength(booking, sessionLength));
                            if (bookings.length === 0)
                                return null; // Skip empty bookings
                            return (_jsx(Booking, { courtName: courtName, bookings: bookings, is24HrTime: is24HrTime }, idx));
                        }) })) : (_jsx("p", { children: "No available bookings" }))] }, index));
        }) }));
}
