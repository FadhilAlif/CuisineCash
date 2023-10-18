import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // env from .env file
    "process.env.FIREBASE_API_KEY": JSON.stringify(
      process.env.FIREBASE_API_KEY
    ),
  },
});
