import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        "-o-id": resolve(__dirname, "src/index.js"),
        dom: resolve(__dirname, "src/dom/index.js"),
        echo: resolve(__dirname, "src/echo/index.js"),
        event: resolve(__dirname, "src/event/index.js"),
      },
      formats: ["cjs", "es"],
    },
    outDir: "dist",
    sourcemap: true,
  },
});
