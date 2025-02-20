import fs from "fs/promises";
import { sendPushNotification } from "./util/pushNotifications.js"; // Implement this function


/**
 * Formats new bookings into a notification message.
 * @param {Array} newBookings - List of new bookings.
 * @returns {string} - The formatted message or an empty string if no valid bookings exist.
 */
function formatBookingsMessage(newBookings) {
  let message = "New court bookings available:\n";
  let hasBookings = false;

  for (const booking of newBookings) {
    const date = booking.date;
    const courtDetails = [];

    for (const court of booking["Court Bookings"]) {
      for (const [courtName, times] of Object.entries(court)) {
        if (times.length > 0) {
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

async function sendNotifications() {
  // Ensure the file exists before reading
  try {
    await fs.access("api/bookings_result_new.json");
  } catch {
    console.log("❌ File api/bookings_result_new.json does not exist. Exiting.");
    return;
  }

  try {
    const data = await fs.readFile("api/bookings_result_new.json", "utf-8");
    const newBookings = JSON.parse(data);

    if (!Array.isArray(newBookings) || newBookings.length === 0) {
      console.log("No new bookings to notify.");
      return;
    }

    // Format the notification message
    const message = formatBookingsMessage(newBookings);

    // Send only if there are actual bookings to notify
    if (message) {
      await sendPushNotification(message);
      console.log("Notification sent successfully!");
    } else {
      console.log("No new actual court bookings to notify.");
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
}

sendNotifications();