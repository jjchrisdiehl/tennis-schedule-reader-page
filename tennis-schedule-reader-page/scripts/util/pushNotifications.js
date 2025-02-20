import admin from "firebase-admin";
import fs from "fs";

// Path to your Firebase service account key JSON file
const serviceAccountPath = "./config/firebase-service-account.json";

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    "Firebase service account key is missing. Download it from Firebase Console."
  );
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const messaging = admin.messaging();

/**
 * Sends a push notification to all subscribed users.
 * @param {string} message - The message to send.
 */
export async function sendPushNotification(message) {
  const payload = {
    notification: {
      title: "New Tennis Court Bookings",
      body: message,
    },
    topic: "tennis-bookings", // Ensure clients subscribe to this topic
  };

  try {
    await messaging.send(payload);
    console.log("✅ Push notification sent successfully.");
  } catch (error) {
    console.error("❌ Error sending push notification:", error);
  }
}