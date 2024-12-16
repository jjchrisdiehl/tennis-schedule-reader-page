import { formatTime, formatAvailableTime } from "../util/helper-functions";

// Represents a single booking
export interface BookingInterface {
    start_time: string;
    end_time: string;
    available_time: string;
}

export type BookingProps = {
    courtName: string;
    bookings: BookingInterface[];
};

export function Booking({ courtName, bookings }: BookingProps) {
    return (
        <li className="court-column">
            <h3 className="court-column__title">{courtName}</h3>
            {bookings.map((booking, index) => (
                <div key={index} className="booking-card">
                    <span className="booking-card__header">Booking</span>
                    <p><span>Time:</span> {formatTime(booking.start_time)} - {formatTime(booking.end_time)}</p>
                    <p><span>Length:</span> {formatAvailableTime(booking.available_time)}</p>
                    <div className="booking-card__footer">
                        <button className="booking-card__button">Book now</button>
                    </div>
                </div>
            ))}
        </li>
    );
}