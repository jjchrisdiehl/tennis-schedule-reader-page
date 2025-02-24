import webpush from "web-push";
import fs from "fs";
import path from "path";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

/**
 * Loads the subscriptions from the secret file.
 */
function loadSubscriptions() {
  const subscriptionsPath = path.resolve("./subscriptions.json");
  if (!fs.existsSync(subscriptionsPath)) {
    console.log("No subscriptions file found.");
    return [];
  }
  return JSON.parse(fs.readFileSync(subscriptionsPath, "utf-8"));
}

/**
 * Sends push notifications to all stored subscribers about new bookings.
 */
export async function sendNotification() {
  try {
    const subscriptions = loadSubscriptions();
    if (subscriptions.length === 0) {
      console.log("No push subscriptions found.");
      return;
    }

    const bookingsPath = path.resolve("./api/bookings_result_new.json");
    if (!fs.existsSync(bookingsPath)) {
      console.log("No new bookings file found.");
      return;
    }

    const bookingsData = JSON.parse(fs.readFileSync(bookingsPath, "utf-8"));
    const message = formatBookingsMessage(bookingsData);
    if (!message) {
      console.log("No valid bookings to notify.");
      return;
    }

    // Send notification to each subscriber
    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(subscription, payload);
        console.log("Notification sent to:", subscription.endpoint);
      } catch (error) {
        console.error("Error sending to subscription:", error);
      }
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
