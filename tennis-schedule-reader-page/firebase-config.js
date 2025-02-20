import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCh-i42po1WRJ_xAj77zz9AJwZMNGGwNtY",
    authDomain: "tennis-scheduler-push.firebaseapp.com",
    projectId: "tennis-scheduler-push",
    storageBucket: "tennis-scheduler-push.firebasestorage.app",
    messagingSenderId: "690211174475",
    appId: "1:690211174475:web:d6229da509e2b05ab1b5ce",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
// ✅ Explicitly set the service worker path
navigator.serviceWorker
    .register("/tennis-schedule-reader-page/firebase-messaging-sw.js")
    .then((registration) => {
    console.log("✅ Service Worker registered:", registration);
})
    .catch((error) => console.error("❌ Service Worker registration failed:", error));
export { firebaseApp, messaging, onMessage, getToken };
