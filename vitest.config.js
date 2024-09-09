import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      reporter: [["lcov", { projectRoot: "./src" }]],
      thresholds: {
        statements: 56,
        branches: 46,
        functions: 36,
        lines: 56,
      },
    },
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "happydom.js")],
  },
});
