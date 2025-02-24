import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development"; // Ensure correct mode for local vs. GitHub Pages
  console.log("Vite Mode:", mode); // Debugging output

  return {
    root: ".", // Load from the correct project subdirectory
    base: isDev ? "/" : "/tennis-schedule-reader-page/", // Use root locally, repo name for GitHub Pages
    build: {
      outDir: "dist", // Ensure the output goes into dist/
      emptyOutDir: true, // Clears previous builds
    },
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
    server: {
      open: true, // Open the browser when running dev server
      host: "localhost",
      port: 5173, // Ensure it's running on default Vite port
    },
  };
});