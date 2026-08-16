import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Vite refuses requests from unknown addresses by default.
    // ngrok gives us a random address each time, so allow its domains.
    allowedHosts: [".ngrok-free.app", ".ngrok-free.dev", ".ngrok.io"],
  },
});
