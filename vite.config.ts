import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const server: { port: number, allowedHosts?: string[] } = {
    port: 3000,
  }

  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  if (env.VITE_NGROK_URL) {
    server.allowedHosts = ["localhost", "127.0.0.1", "0.0.0.0", env.VITE_NGROK_URL]
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: server,
  }
})
