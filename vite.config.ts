import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Configura a base URL para o GitHub Pages.
// Deve ser o nome exato do repositório, cercado por barras (/)
// Para o seu repositório "pro-view-panel", o caminho base é "/pro-view-panel/".
const REPO_BASE_PATH = "/pro-view-panel/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // A propriedade 'base' é crucial para dizer ao Vite onde encontrar os assets
  // (CSS, JS, etc.) em ambientes de produção (como o GitHub Pages).
  base: mode === "production" ? REPO_BASE_PATH : "/",
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
