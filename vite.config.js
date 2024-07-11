import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        element: resolve(__dirname, "src/index.js"),
        handy: resolve(__dirname, "src/handy.js"),
      },
      formats: ["cjs", "es"],
    },
    outDir: "dist",
  },
});
