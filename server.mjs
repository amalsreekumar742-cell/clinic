import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const DIST_DIR = path.join(__dirname, "dist");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

function serveFile(res, filePath, statusCode = 200, isHeadRequest = false) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }

    const contentType = getContentType(filePath);
    const headers = {
      "Content-Type": contentType,
      "Content-Length": stats.size,
      "X-Content-Type-Options": "nosniff",
    };

    if (filePath.includes(path.join(DIST_DIR, "assets"))) {
      headers["Cache-Control"] = "public, max-age=31536000, immutable";
    } else {
      headers["Cache-Control"] = "no-cache";
    }

    res.writeHead(statusCode, headers);

    if (isHeadRequest) {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on("error", () => {
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("500 Internal Server Error");
      }
    });
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("405 Method Not Allowed");
    return;
  }

  const isHead = req.method === "HEAD";

  let pathname = "/";
  try {
    pathname = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("400 Bad Request");
    return;
  }

  // 301 Redirects for legacy typos and canonical route aliases
  const REDIRECTS = {
    "/treatments/abhayanga": "/treatments/abhyanga",
    "/treatments/abhayanga/": "/treatments/abhyanga",
    "/doctor": "/about",
    "/doctor/": "/about",
  };

  if (REDIRECTS[pathname]) {
    res.writeHead(301, {
      Location: REDIRECTS[pathname],
      "Content-Type": "text/plain; charset=utf-8",
    });
    res.end(`301 Moved Permanently to ${REDIRECTS[pathname]}`);
    return;
  }

  // Prevent path traversal
  const decodedPath = decodeURIComponent(pathname);
  const safeRelativePath = path.normalize(decodedPath).replace(/^(\.\.[\/\\])+/, "");
  const targetPath = path.join(DIST_DIR, safeRelativePath);

  // Security check: must remain inside DIST_DIR
  if (!targetPath.startsWith(DIST_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("403 Forbidden");
    return;
  }

  fs.stat(targetPath, (err, stats) => {
    // 1. Direct file match (e.g. /assets/main.js, /favicon.ico)
    if (!err && stats.isFile()) {
      serveFile(res, targetPath, 200, isHead);
      return;
    }

    // 2. Directory match -> look for index.html (e.g. /contact -> dist/contact/index.html)
    if (!err && stats.isDirectory()) {
      const indexPath = path.join(targetPath, "index.html");
      if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
        serveFile(res, indexPath, 200, isHead);
        return;
      }
    }

    // 3. Sub-route directory check if path doesn't end with slash (e.g., /contact -> dist/contact/index.html)
    const routeIndexPath = path.join(targetPath, "index.html");
    if (fs.existsSync(routeIndexPath) && fs.statSync(routeIndexPath).isFile()) {
      serveFile(res, routeIndexPath, 200, isHead);
      return;
    }

    // 4. If request has an explicit non-HTML file extension (e.g. missing .png or .js file), return 404
    const ext = path.extname(decodedPath);
    if (ext && ext !== ".html") {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }

    // 5. Unknown route fallback -> serve dist/404.html with true HTTP 404 status
    const notFoundPath = path.join(DIST_DIR, "404.html");
    if (fs.existsSync(notFoundPath)) {
      serveFile(res, notFoundPath, 404, isHead);
      return;
    }

    const fallbackIndexPath = path.join(DIST_DIR, "index.html");
    if (fs.existsSync(fallbackIndexPath)) {
      serveFile(res, fallbackIndexPath, 404, isHead);
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://localhost:${PORT} (bound to ${HOST}:${PORT})`);
});
