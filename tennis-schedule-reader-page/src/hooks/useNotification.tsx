import { useState, useEffect } from "react";
const isDev = import.meta.env.MODE === "development";

/**
 * Handles push notifications and manages user subscriptions.
 */
const useNotification = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        checkSubscriptionStatus();
    }, []);

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            const swPath = `/${!isDev ? "tennis-schedule-reader-page/" : ""}webpush-sw.js`;
            navigator.serviceWorker.register(swPath)
                .then(reg => console.log("✅ Service Worker Registered at:", swPath, reg))
                .catch(err => console.error("❌ SW Registration Failed:", err));
        }
    }, []);

    /**
     * Fetches the VAPID public key from the backend.
     * @returns {Promise<string | null>} The VAPID public key or null if an error occurs.
     */
    const getVapidPublicKey = async (): Promise<string | null> => {
        try {
            const url = `${import.meta.env.BASE_URL}vapidPublicKey.json`; // Use static JSON file

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to load VAPID public key");
            }

            const data = await response.json();
            console.log("🔑 VAPID Public Key:", data.key);
            return data.key;
        } catch (error) {
            console.error("❌ Error fetching VAPID key:", error);
            return null;
        }
    };

    /**
     * Checks if the user is already subscribed to push notifications.
     */
    const checkSubscriptionStatus = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            setIsSubscribed(!!subscription);
        } catch (error) {
            console.error("⚠️ Error checking subscription status:", error);
        }
    };

    /**
     * Requests permission and subscribes the user to push notifications.
     */
    const requestPermissionAndSubscribe = async () => {
        console.log("🔔 Requesting notification permission...");
        const permission = await Notification.requestPermission();
        console.log("📢 Permission response:", permission);

        if (permission !== "granted") {
            console.warn("🚫 Notification permission denied");
            return;
        }

        try {
            console.log("🌍 Fetching VAPID public key...");
            const publicKey = await getVapidPublicKey();
            if (!publicKey) {
                console.error("🚨 No VAPID public key available.");
                return;
            }
            console.log("✅ VAPID Key:", publicKey);

            const registration = await navigator.serviceWorker.ready;
            console.log("🛠 Service Worker Ready:", registration);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey),
            });

            console.log("📨 Push Subscription Created:", subscription);

            // Send the subscription to the backend
            await fetch("/api/updateSubscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subscription, action: "subscribe" }),
            });

            setIsSubscribed(true);
        } catch (error) {
            console.error("❌ Error subscribing to push notifications:", error);
        }
    };

    /**
     * Unsubscribes the user from push notifications.
     */
    const unsubscribeFromNotifications = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            if (subscription) {
                await subscription.unsubscribe();
                console.log("🔕 Unsubscribed from push notifications");

                // Notify backend
                await fetch("/api/updateSubscription", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ subscription, action: "unsubscribe" }),
                });

                setIsSubscribed(false);
            }
        } catch (error) {
            console.error("❌ Error unsubscribing:", error);
        }
    };

    /**
     * Converts a Base64 string to a Uint8Array.
     * @param {string} base64String - The Base64 string.
     * @returns {Uint8Array} The converted Uint8Array.
     */
    function urlBase64ToUint8Array(base64String: string): Uint8Array {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
        const rawData = atob(base64);
        return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
    }

    return { isSubscribed, requestPermissionAndSubscribe, unsubscribeFromNotifications };
};

export default useNotification;