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
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 88,
      },
    },
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "happydom.js")],
  },
});
