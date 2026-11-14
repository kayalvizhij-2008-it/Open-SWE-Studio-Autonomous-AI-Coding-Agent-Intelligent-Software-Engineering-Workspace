import { existsSync, cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { execSync } from "node:child_process"

console.log("==> Building Open-SWE Studio UI...")
execSync("pnpm --filter open-swe-dashboard run build", { stdio: "inherit" })

console.log("==> Aligning Vercel Build Output...")
if (existsSync("ui/.vercel/output")) {
  cpSync("ui/.vercel/output", ".vercel/output", { recursive: true })
  console.log("Copied ui/.vercel/output to .vercel/output")
  const configPath = ".vercel/output/config.json"
  if (existsSync(configPath)) {
    const raw = readFileSync(configPath, "utf8")
    const fixed = raw.replaceAll("ui/.vercel/output/", ".vercel/output/").replaceAll("ui/.vercel/output", ".vercel/output")
    writeFileSync(configPath, fixed, "utf8")
    console.log("Normalized .vercel/output/config.json routes")
  }
} else if (existsSync("ui/.output/public")) {
  mkdirSync(".vercel/output", { recursive: true })
  cpSync("ui/.output/public", ".vercel/output/static", { recursive: true })
  console.log("Copied ui/.output/public to .vercel/output/static")
}
console.log("==> Vercel build complete.")
