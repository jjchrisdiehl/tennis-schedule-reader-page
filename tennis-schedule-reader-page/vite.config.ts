import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    base: isDev ? "/" : "/tennis-schedule-reader-page/",
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: { enabled: true },
        manifest: {
          name: "Tennis Scheduler",
          short_name: "Tennis",
          description: "Stay updated with new tennis court bookings!",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          icons: [
            {
              src: "/src/assets/cog-wheel-silhouette.png",
              sizes: "256x256",
              type: "image/png",
            },
          ],
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/your-api-endpoint\.com\//,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@util": path.resolve(__dirname, "src/util"),
      },
    },
    server: {
      open: true,
      host: "localhost",
      port: 5173,
    },
  };
});