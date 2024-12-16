import { Booking, BookingInterface } from "./Booking";

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
            {data.map((dayData: CourtBookingsData, index: number) => {
                // Check if there are any bookings across all courts for the day
                const hasBookings = dayData["Court Bookings"].some((court: Court) => {
                    // Check if any court has bookings (i.e., length > 0 for the bookings array)
                    const courtBookings = Object.values(court)[0]; // Get the bookings array
                    return courtBookings.length > 0;
                });

                return (
                    <div key={index} className="day-booking">
                        <h2 className="day-booking__date-header">
                            {formatDate(String(dayData.date))}
                        </h2>
                        {hasBookings ? (
                            <ul className="courts schedule">
                                {dayData["Court Bookings"].map((court: Court, idx: number) => {
                                    const courtName = Object.keys(court)[0];
                                    const bookings = court[courtName];
                                    if (bookings.length === 0) return null; // Skip empty bookings
                                    return (
                                        <Booking
                                            key={idx}
                                            courtName={courtName}
                                            bookings={bookings}
                                        />
                                    );
                                })}
                            </ul>
                        ) : (
                            <p>No bookings available 🙁</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}