import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "path";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "electron/main/index.ts"),
        },
        output: {
          entryFileNames: "[name].cjs",
        },
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "electron/preload/index.ts"),
        },
      },
    },
  },
  renderer: {
    root: ".",
    envPrefix: "VITE_",
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html"),
        },
      },
    },
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      // legacy(),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  },
});
