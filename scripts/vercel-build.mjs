import { existsSync, cpSync, mkdirSync } from "node:fs"
import { execSync } from "node:child_process"

console.log("==> Building Open-SWE Studio UI...")
execSync("pnpm --filter open-swe-dashboard run build", { stdio: "inherit" })

console.log("==> Aligning Vercel Build Output...")
if (existsSync("ui/.vercel/output")) {
  cpSync("ui/.vercel/output", ".vercel/output", { recursive: true })
  console.log("Copied ui/.vercel/output to .vercel/output")
} else if (existsSync("ui/.output/public")) {
  mkdirSync(".vercel/output", { recursive: true })
  cpSync("ui/.output/public", ".vercel/output/static", { recursive: true })
  console.log("Copied ui/.output/public to .vercel/output/static")
}
console.log("==> Vercel build complete.")
