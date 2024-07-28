import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        element: resolve(__dirname, "src/index.js"),
        event: resolve(__dirname, "src/event/index.js"),
      },
      formats: ["cjs", "es"],
    },
    outDir: "dist",
  },
});
