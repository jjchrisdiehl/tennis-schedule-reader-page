import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
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
    resolve: {
        alias: {
            "@util": path.resolve(__dirname, "src/util"), // Ensure alias matches tsconfig.json
        },
    },
});
