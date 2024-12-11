// Represents a single booking
export interface BookingInterface {
    start_time: number;
    end_time: number;
    available_time: number;
}

export type BookingProps = {
    courtName: string;
    bookings: BookingInterface[];
};

export function Booking({ courtName, bookings }: BookingProps) {
    return (
        <li>
            <h3>{courtName}</h3>
            {bookings.map((booking, index) => (
                <div key={index} className="booking-card">
                    <p>Start Time: {booking.start_time}</p>
                    <p>End Time: {booking.end_time}</p>
                    <p>Available Time: {booking.available_time} hours</p>
                </div>
            ))}
        </li>
    );
}