import { Booking, BookingInterface, BookingProps } from "./Booking";

// Represents a court with dynamic court names as keys
export type Court = {
    [courtName: string]: BookingInterface[];
};

// Represents the structure of each day's booking data
export interface CourtBookingsData {
    date: string;
    "Court Bookings": Court[];
}

export function CourtBookings({ data }: { data: CourtBookingsData[] }) {
    function formatDate(dateString: string): string {
        const date = new Date(
            Number(dateString.substring(0, 4)),
            Number(dateString.substring(4, 6)) - 1,
            Number(dateString.substring(6))
        );
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    return (
        <div>
            {data.map((dayData, index) => (
                <div key={index} className="day-bookings">
                    <h2>{formatDate(String(dayData.date))}</h2>
                    <ul className="courts schedule">
                        {dayData["Court Bookings"].map((court, idx) => {
                            const [courtName, bookings] = Object.entries(court)[0] as [
                                string,
                                BookingProps["bookings"]
                            ];
                            if (bookings.length === 0) return null; // Skip empty bookings
                            return (
                                <Booking key={idx} courtName={courtName} bookings={bookings} />
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}