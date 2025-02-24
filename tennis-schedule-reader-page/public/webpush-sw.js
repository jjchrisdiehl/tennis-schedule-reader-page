/**
 * Registers the service worker and subscribes the user to push notifications.
 * This function is triggered via a message event from the main thread.
 */
self.addEventListener("message", async (event) => {
    if (event.data && event.data.action === "registerPush") {
        console.log("🛎 Registering push subscription...");

        try {
            const subscription = await self.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: base64UrlToUint8Array(event.data.publicKey),
            });

            console.log("✅ Push Subscription Successful:", subscription);

            // Send a serializable object instead of the original subscription
            event.ports[0].postMessage({
                success: true,
                subscription: subscription.toJSON() // Convert to JSON
            });
        } catch (err) {
            console.error("❌ Subscription failed in SW:", err);
            event.ports[0].postMessage({ success: false, error: err.message });
        }
    }
});

/**
 * Handles incoming push events.
 */
self.addEventListener("push", (event) => {
    if (!event.data) {
        console.warn("⚠️ Push event received with no data");
        return;
    }

    const data = event.data.json();
    console.log("📩 Push notification received:", data);

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/icon.png",
        badge: "/badge.png", // Optional badge icon
        data: { url: data.url || "/" }, // Store a URL for opening on click
    });
});

/**
 * Handles notification click events.
 */
self.addEventListener("notificationclick", (event) => {
    event.notification.close(); // Close the notification

    if (event.notification.data && event.notification.data.url) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url) // Open the stored URL
        );
    }
});

/**
 * Converts a base64 URL-safe string to a Uint8Array.
 * @param {string} base64Url - The base64-encoded VAPID key.
 * @returns {Uint8Array} - The decoded key as a Uint8Array.
 */
function base64UrlToUint8Array(base64Url) {
    console.log("📢 Original Key Before Decoding:", base64Url);

    // Fix incorrect Base64 padding
    const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
    const base64 = (base64Url + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    console.log("🧐 Fixed Base64:", base64);

    try {
        const rawData = atob(base64);
        console.log("✅ Successfully Decoded Base64 Data");

        return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
    } catch (error) {
        console.error("❌ Base64 decoding failed:", error, base64);
        throw new Error("Invalid VAPID public key format");
    }
}