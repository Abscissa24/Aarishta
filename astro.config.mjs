import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
// base must match the public repo name hosting the built site, since
// GitHub Pages serves it at https://abscissa24.github.io/<repo>/
export default defineConfig({
  site: "https://abscissa24.github.io",
  base: 'Aarishta',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [react(), icon()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@tsparticles/react", "@tsparticles/engine", "@tsparticles/slim"],
    },
    optimizeDeps: {
      exclude: ["@tsparticles/react", "@tsparticles/engine", "@tsparticles/slim"],
    },
  },
});
