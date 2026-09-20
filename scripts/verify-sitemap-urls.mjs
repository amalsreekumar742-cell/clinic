import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");
const sitemapPath = join(rootDir, "public", "sitemap.xml");

// 1. Read sitemap.xml and extract all URLs
const sitemapContent = await readFile(sitemapPath, "utf8");
const locMatches = [...sitemapContent.matchAll(/<loc>(https:\/\/chirocare\.co\.in(\/[^<]*))<\/loc>/g)];
const urls = locMatches.map((m) => m[2] === "" ? "/" : m[2]);

console.log(`Found ${urls.length} URLs in public/sitemap.xml\n`);

// 2. Load data from source files
const servicesModule = await import("../src/data/services.js").catch(() => null);
// Let's read services.ts and treatments.ts and blogs.ts as text to extract slugs
const servicesContent = await readFile(join(rootDir, "src", "data", "services.ts"), "utf8");
const activeServiceSlugs = [...servicesContent.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const treatmentsContent = await readFile(join(rootDir, "src", "data", "treatments.ts"), "utf8");
// Extract only uncommented slugs
// Split into blocks or strip comments
const uncommentedTreatments = treatmentsContent.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/g, "");
const activeTreatmentSlugs = [...uncommentedTreatments.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const blogsContent = await readFile(join(rootDir, "src", "data", "blogs.ts"), "utf8");
const activeBlogSlugs = [...blogsContent.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

// 3. Start local server from server.mjs logic on an available port
const PORT = 3099;
process.env.PORT = String(PORT);

// Import server.mjs dynamically or run test directly
const { spawn } = await import("node:child_process");
const serverProcess = spawn("node", ["server.mjs"], {
  cwd: rootDir,
  env: { ...process.env, PORT: String(PORT) },
  stdio: "pipe",
});

await new Promise((resolve) => setTimeout(resolve, 1500));

const results = [];
let hasAnyMismatch = false;

for (const path of urls) {
  const isHome = path === "/";
  const relativeDistPath = isHome ? "index.html" : join(path.slice(1), "index.html");
  const fullDistPath = join(distDir, relativeDistPath);
  
  // Check 1: Prerender file existence
  const prerenderExists = existsSync(fullDistPath) && statSync(fullDistPath).isFile();

  // Check 2: React Route existence
  let reactRouteExists = false;
  if (["/", "/about", "/services", "/treatments", "/gallery", "/contact", "/blog"].includes(path)) {
    reactRouteExists = true;
  } else if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "");
    reactRouteExists = activeServiceSlugs.includes(slug);
  } else if (path.startsWith("/treatments/")) {
    const slug = path.replace("/treatments/", "");
    reactRouteExists = activeTreatmentSlugs.includes(slug);
  } else if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    reactRouteExists = activeBlogSlugs.includes(slug);
  }

  // Check 3: HTTP status from production server
  const serverResponse = await new Promise((resolve) => {
    const req = http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          location: res.headers.location || null,
          hasBody: data.length > 0,
        });
      });
    });
    req.on("error", (err) => resolve({ statusCode: 0, error: err.message }));
  });

  const is200 = serverResponse.statusCode === 200;
  const isRedirect = [301, 302, 307, 308].includes(serverResponse.statusCode);
  const is404 = serverResponse.statusCode === 404;

  const valid = reactRouteExists && prerenderExists && is200 && !isRedirect && !is404;
  if (!valid) hasAnyMismatch = true;

  results.push({
    path,
    reactRouteExists,
    prerenderExists,
    statusCode: serverResponse.statusCode,
    isRedirect,
    is404,
    valid,
  });
}

serverProcess.kill();

console.log("| # | Sitemap URL | React Route | Prerender HTML | Server Status | Redirect? | 404? | Result |");
console.log("|---|---|:---:|:---:|:---:|:---:|:---:|:---:|");

results.forEach((r, idx) => {
  console.log(
    `| ${idx + 1} | \`${r.path}\` | ${r.reactRouteExists ? "✅ Yes" : "❌ No"} | ${r.prerenderExists ? "✅ Yes" : "❌ No"} | **${r.statusCode}** | ${r.isRedirect ? "⚠️ Yes" : "No"} | ${r.is404 ? "❌ Yes" : "No"} | ${r.valid ? "✅ PASS" : "❌ FAIL"} |`
  );
});

console.log(`\n==============================================`);
console.log(`Total URLs verified: ${results.length}`);
console.log(`Mismatches found: ${hasAnyMismatch ? "YES" : "NONE (0)"}`);
console.log(`==============================================`);

process.exit(hasAnyMismatch ? 1 : 0);
