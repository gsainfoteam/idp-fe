import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    open: true,
    port: 3000,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint src/",
        dev: {
          logLevel: ["warning"],
        },
      },
      enableBuild: false,
    }),
    svgr(),
  ],
});
