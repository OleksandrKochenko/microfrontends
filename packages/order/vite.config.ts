import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSingleSpa from "vite-plugin-single-spa";
import fullReload from "vite-plugin-full-reload";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginSingleSpa({
      type: "mife",
      serverPort: 9103,
      spaEntryPoint: "./src/spa.tsx",
    }),
    fullReload(["src/**/*"]),
  ],
});
