/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;
declare const __WB_MANIFEST: any;

self.addEventListener("install", (event) => {
  console.log("📦 Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker: Activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event: FetchEvent) => {
  console.log("🔍 Service Worker: Fetching", event.request.url);
});

precacheAndRoute(self.__WB_MANIFEST);