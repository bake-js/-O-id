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
        statements: 83,
        branches: 86,
        functions: 83,
        lines: 83,
      },
    },
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "happydom.js")],
  },
});
