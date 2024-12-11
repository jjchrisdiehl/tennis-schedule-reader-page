import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    base: "/tennis-schedule-reader-page/",
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
          @use '/src/styles/variables' as *;
          @use '/src/styles/mixins' as *;
        `,
            },
        },
    },
});
