import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // render deploy need 
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: ["managewise-frontend-b7o5.onrender.com"],
  },
  server: {
    port: 8080, // if you want to run website on local machine then you need to just change port 8080 to 5173 
    host: "0.0.0.0",
    strictPort: true,
  },
});
