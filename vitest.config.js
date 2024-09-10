import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.js"],
      exclude: [
        "src/**/*.spec.ts",
        "src/**/index.js",
        "src/**/types.d.ts",
        "src/**/README.md",
      ],
      reporter: ["lcov", "text"],
      thresholds: {
        statements: 60,
        branches: 79,
        functions: 66,
        lines: 60,
      },
    },
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "happydom.js")],
  },
});
