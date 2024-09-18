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
      reporter: ["lcov", "html"],
      thresholds: {
        statements: 80,
        branches: 85,
        functions: 85,
        lines: 80,
      },
    },
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "happydom.js")],
  },
});
