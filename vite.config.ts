import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { defineConfig } from "vite";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    libInjectCss(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.lib.json", // Point to the library's tsconfig
    }),
  ],
  build: {
    // Configure Vite for library mode.
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "VectorTerminal",
      formats: ["es"],
      fileName: "main",
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into the library.
      external: ["react", "react-dom", "class-variance-authority"],
      output: {
        globals: { react: "React", "react-dom": "ReactDOM" },
      },
    },
  },
});
