const DB_NAME = "TennisSchedulerDB";
const DB_VERSION = 1;
const STORE_SETTINGS = "app_settings";

/**
 * Opens IndexedDB and ensures the object stores exist.
 */
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION); // ⬆️ Use updated version

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
        db.createObjectStore(STORE_SETTINGS);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Stores app settings in IndexedDB.
 */
export const saveSettingsToDB = async (settings: any) => {
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
export const getSettingsFromDB = async (): Promise<any | null> => {
  const db = await openDB();
  return new Promise((resolve) => {
    const request = db
      .transaction(STORE_SETTINGS, "readonly")
      .objectStore(STORE_SETTINGS)
      .get("app_settings");

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => resolve(null);
  });
};