import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   // You can define additional variables here if needed
  //   __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
  // },
  server: {
    port: 5175, // 👈 change this to any port you want
    open: true, // (optional) auto-open browser on start
    allowedHosts: [
      "4ca93ff5d19f.ngrok-free.app", // your ngrok domain
    ],
  },
});
