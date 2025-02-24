import { CourtBookingsData } from "../../src/components/CourtBookings";

/**
 * Formats new bookings into a notification message.
 * @param {BookingInterface[]} newBookings - List of new bookings.
 * @returns {string} - The formatted message or an empty string if no valid bookings exist.
 */
export function formatBookingsMessage(newBookings: CourtBookingsData[]): string {
  let message = "New court bookings available:\n";
  let hasBookings = false;

  for (const booking of newBookings) {
    const date = booking.date;
    const courtDetails: string[] = [];

    for (const court of booking["Court Bookings"]) {
      for (const [courtName, times] of Object.entries(court)) {
        if (Array.isArray(times) && times.length > 0) {
          const timeSlots = times
            .map((slot) => `${slot.start_time}:00 - ${slot.end_time}:00`)
            .join(", ");
          courtDetails.push(`${courtName}: ${timeSlots}`);
          hasBookings = true; // Ensure we actually have valid bookings
        }
      }
    }

    if (courtDetails.length > 0) {
      message += `📅 ${date} - ${courtDetails.join(" | ")}\n`;
    }
  }

  return hasBookings ? message : ""; // Return empty string if no valid bookings exist
}