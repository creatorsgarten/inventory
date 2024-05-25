import { vitePlugin as remix } from "@remix-run/dev"
import { installGlobals } from "@remix-run/node"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import mkcert from'vite-plugin-mkcert'

installGlobals()

export default defineConfig({
  plugins: [
    remix({ ssr: false }),
    tsconfigPaths(),
    mkcert()
  ],
})
