import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.{js,ts}"],
      exclude: [
        "src/**/*.test.{js,ts}",
        "src/**/index.js",
        "src/**/types.d.ts",
        "src/**/README.md",
      ],
      reporter: ["lcov", "text"],
      thresholds: {
        statements: 57,
        branches: 74,
        functions: 66,
        lines: 57,
      },
    },
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "happydom.js")],
  },
});
