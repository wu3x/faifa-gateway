import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { componentTagger } from "lovable-tagger";

// Build-time discovery; no API key or manually maintained photo list.
function placePhotoIndex() {
  const virtualId = "virtual:place-photos";
  const resolvedId = "\0" + virtualId;
  const directory = path.resolve(__dirname, "public/place-photos");
  const scan = () => {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory, { withFileTypes: true })
      .filter(file => file.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(file.name))
      .map(file => file.name).sort((a, b) => a.localeCompare(b, "ar", { numeric: true }));
  };
  return {
    name: "faifa-place-photo-index",
    resolveId(id: string) { return id === virtualId ? resolvedId : undefined; },
    load(id: string) {
      if (id !== resolvedId) return undefined;
      return "export default " + JSON.stringify(scan()) + ";";
    },
    configureServer(server: any) {
      if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
      server.watcher.add(directory);
      const refresh = (file: string) => {
        if (!file.startsWith(directory + path.sep)) return;
        const module = server.moduleGraph.getModuleById(resolvedId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh).on("unlink", refresh);
    },
  };
}
export default defineConfig(({ mode }) => ({
  base: "/faifa-gateway/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    placePhotoIndex(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
