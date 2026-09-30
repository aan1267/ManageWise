import path from "path";
import { defineConfig } from 'vite'
import { fileURLToPath } from "url";
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default defineConfig({
   plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: ['managewisefrontend.onrender.com']
  },
  resolve: {
    alias: {
       "@": path.resolve(__dirname, "./src"),
    },
  },
})
