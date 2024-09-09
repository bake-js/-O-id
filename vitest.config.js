import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      reporter: [["lcov", { projectRoot: "./src" }]],
    },
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "happydom.js")],
  },
});
