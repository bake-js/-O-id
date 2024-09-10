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
        statements: 59,
        branches: 70,
        functions: 69,
        lines: 59,
      },
    },
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "happydom.js")],
  },
});
