import { useEffect, useState } from "react";
import { getToken, deleteToken, onMessage } from "firebase/messaging";
import { messaging } from "../../firebase-config";
import { getFcmToken, saveFcmToken } from "../util/indexedDB";
const VAPID_KEY = "BGYZ0Tjou1G_DHPp9qTLc-r4FFfc_vp3BNJVGI9jo5gnqkO9ua5LWKUtDf3stAMtVCoUqEBZIprgUYkdg3R2pj8"; // Replace with your actual VAPID key
const useNotification = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [fcmToken, setFcmToken] = useState(null);
    /**
     * Checks if an FCM token exists in IndexedDB. If it does, use it;
     * otherwise, request a new one.
     */
    useEffect(() => {
        const initializeFcmToken = async () => {
            const storedToken = await getFcmToken();
            if (storedToken) {
                console.log("✅ Found existing FCM token in IndexedDB:", storedToken);
                setFcmToken(storedToken);
                setIsSubscribed(true);
            }
        };
        initializeFcmToken();
    }, []);
    /**
     * Requests notification permission and subscribes the user if granted.
     */
    const requestPermissionAndSubscribe = async () => {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn("🚫 Notification permission denied");
            return;
        }
        try {
            const registration = await navigator.serviceWorker.ready;
            const token = await getToken(messaging, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration,
            });
            if (token) {
                console.log("✅ Subscribed to notifications. Token:", token);
                setFcmToken(token);
                setIsSubscribed(true);
                // Store token in IndexedDB
                await saveFcmToken(token);
            }
            else {
                console.warn("⚠️ No FCM token received.");
            }
        }
        catch (error) {
            console.error("❌ Error getting FCM token:", error);
        }
    };
    /**
     * Unsubscribes the user from notifications and removes their FCM token.
     */
    const unsubscribeFromNotifications = async () => {
        if (!fcmToken) {
            console.warn("⚠️ No token found, skipping unsubscribe.");
            return;
        }
        try {
            // Ensure the correct service worker is registered before deleting the token
            await navigator.serviceWorker.register("/tennis-schedule-reader-page/firebase-messaging-sw.js");
            await deleteToken(messaging);
            console.log("🔕 Unsubscribed from notifications");
            setFcmToken(null);
            setIsSubscribed(false);
            // Remove token from IndexedDB
            await saveFcmToken(null);
        }
        catch (error) {
            console.error("❌ Error unsubscribing:", error);
        }
    };
    /**
     * Listens for foreground push notifications.
     */
    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("🔔 Foreground notification received:", payload);
            new Notification(payload.notification?.title || "New Notification", {
                body: payload.notification?.body || "You have a new message.",
                icon: payload.notification?.icon || "/default-icon.png",
            });
        });
        return () => unsubscribe();
    }, []);
    return { isSubscribed, requestPermissionAndSubscribe, unsubscribeFromNotifications };
};
export default useNotification;
