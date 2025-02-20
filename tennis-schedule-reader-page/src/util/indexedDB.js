const DB_NAME = "TennisSchedulerDB";
const DB_VERSION = 1;
const STORE_FCM = "fcm_tokens";
const STORE_SETTINGS = "app_settings";
/**
 * Opens IndexedDB and ensures the object stores exist.
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION); // ⬆️ Use updated version
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Delete old store if it exists without keyPath
            if (db.objectStoreNames.contains(STORE_FCM)) {
                db.deleteObjectStore(STORE_FCM);
            }
            // Recreate store with keyPath
            if (!db.objectStoreNames.contains(STORE_FCM)) {
                db.createObjectStore(STORE_FCM, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
                db.createObjectStore(STORE_SETTINGS);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
/**
 * Stores the FCM token in IndexedDB.
 */
export const saveFcmToken = async (token) => {
    const db = await openDB();
    const transaction = db.transaction(STORE_FCM, "readwrite");
    const store = transaction.objectStore(STORE_FCM);
    if (token) {
        await store.put({ id: "fcmToken", token }); // ✅ Ensure "id" is included
    }
    else {
        await store.delete("fcmToken");
    }
    await new Promise((resolve, reject) => {
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
    });
    db.close();
};
/**
 * Retrieves the stored FCM token from IndexedDB.
 */
export const getFcmToken = async () => {
    const db = await openDB();
    return new Promise((resolve) => {
        const request = db.transaction(STORE_FCM, "readonly").objectStore(STORE_FCM).get("fcmToken");
        request.onsuccess = () => resolve(request.result?.token ?? null); // ✅ Ensure it returns only the token
        request.onerror = () => resolve(null);
    });
};
/**
 * Removes the stored FCM token from IndexedDB.
 */
export const removeFcmToken = async () => {
    const db = await openDB();
    const transaction = db.transaction(STORE_FCM, "readwrite");
    transaction.objectStore(STORE_FCM).delete("fcmToken");
    await new Promise((resolve, reject) => {
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
    });
    db.close();
};
/**
 * Stores app settings in IndexedDB.
 */
export const saveSettings = async (settings) => {
    const db = await openDB();
    const transaction = db.transaction(STORE_SETTINGS, "readwrite");
    transaction.objectStore(STORE_SETTINGS).put(settings, "app_settings");
    await new Promise((resolve, reject) => {
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
    });
    db.close();
};
/**
 * Retrieves stored app settings from IndexedDB.
 */
export const getSettings = async () => {
    const db = await openDB();
    return new Promise((resolve) => {
        const request = db.transaction(STORE_SETTINGS, "readonly").objectStore(STORE_SETTINGS).get("app_settings");
        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => resolve(null);
    });
};
