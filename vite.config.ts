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
    proxy: {
      "/local": {
        target: "https://api.idp.gistory.me",
        changeOrigin: true,
        headers: {
          Origin: "https://idp.gistory.me",
        },
        rewrite: (path) => path.replace(/^\/local/, ""),
      },
    },
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
