importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCh-i42po1WRJ_xAj77zz9AJwZMNGGwNtY",
  authDomain: "tennis-scheduler-push.firebaseapp.com",
  projectId: "tennis-scheduler-push",
  storageBucket: "tennis-scheduler-push.appspot.com",
  messagingSenderId: "690211174475",
  appId: "1:690211174475:web:d6229da509e2b05ab1b5ce",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("🔔 Background notification received:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://localhost:5173/tennis-schedule-reader-page/")
  );
});