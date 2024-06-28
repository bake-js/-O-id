import { resolve } from "path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "index.js"),
			fileName: "element",
			formats: ["cjs", "es"],
			name: "element",
		},
		outDir: "dist",
	},

	plugins: [
		babel({
			babelConfig: {
				plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
			},
		}),
	],

	resolve: {
		alias: {
			artifact: resolve(__dirname, "packages/artifact"),
			directive: resolve(__dirname, "packages/directive"),
			element: resolve(__dirname, "packages/element"),
			pixel: resolve(__dirname, "packages/pixel"),
			polyfill: resolve(__dirname, "packages/polyfill"),
			standard: resolve(__dirname, "packages/standard"),
		},
	},
});
