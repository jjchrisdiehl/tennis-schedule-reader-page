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

export function CourtBookings({
    data,
    is24HrTime,
    availableHours,
}: {
    data: CourtBookingsData[];
    is24HrTime: boolean;
    availableHours: number[];
}) {
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

    function isBookingWithinAvailableHours(
        booking: BookingInterface,
        availableHours: number[]
    ): boolean {
        const [from, to] = availableHours;
        return (
            Number(booking.start_time) >= from &&
            Number(booking.end_time) <= to
        );
    }

    return (
        <div>
            {data.map((dayData: CourtBookingsData, index: number) => {
                // Check if there are any bookings for the day across all courts after applying filters
                const hasBookings = dayData["Court Bookings"].some((court: Court) => {
                    const courtName = Object.keys(court)[0];
                    const courtBookings = court[courtName];
                    return courtBookings.some((booking) =>
                        isBookingWithinAvailableHours(booking, availableHours)
                    );
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
                                    const bookings = court[courtName].filter((booking) =>
                                        isBookingWithinAvailableHours(
                                            booking,
                                            availableHours
                                        )
                                    );
                                    if (bookings.length === 0) return null; // Skip empty bookings
                                    return (
                                        <Booking
                                            key={idx}
                                            courtName={courtName}
                                            bookings={bookings}
                                            is24HrTime={is24HrTime}
                                        />
                                    );
                                })}
                            </ul>
                        ) : (
                            <p>No available bookings</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}