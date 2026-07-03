import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Own dev port so this can run alongside other projects.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5185,
    strictPort: false,
    host: true,
  },
  build: {
    target: "es2020",
    // Code-split the R3F Canvas + three/gsap into their own chunks so the
    // editorial resting state paints without shipping the WebGL runtime.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("three") || id.includes("@react-three")) return "webgl";
          if (id.includes("gsap")) return "gsap";
        },
      },
    },
  },
});
