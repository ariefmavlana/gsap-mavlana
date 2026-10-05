import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import portfolio from "../content/portfolio.json" with { type: "json" };

const root = new URL("../.output/public/", import.meta.url);
const paths = [
  "",
  "work",
  "studio",
  "contact",
  "privacy",
  ...portfolio.projects.map((p) => `work/${p.slug}`),
];
const titles = new Set();
for (const path of paths) {
  const html = await readFile(
    new URL(`${path ? path + "/" : ""}index.html`, root),
    "utf8",
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${path}: exactly one h1`,
  );
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${path}: unique title`);
  titles.add(title);
  assert.match(html, /name="description" content="[^"]+"/);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `${path}: canonical`);
  assert.ok(!new URL(canonical).search, `${path}: canonical without query`);
  assert.match(html, /property="og:image" content="https?:\/\//);
  if (new URL(canonical).hostname.endsWith(".vercel.app")) {
    assert.match(html, /name="robots" content="noindex, nofollow"/);
  }
  for (const match of html.matchAll(
    /(?:src|href)="(\/(?:images|uploads|_nuxt)\/[^"?]+)"/g,
  )) {
    await access(new URL(match[1].slice(1), root));
  }
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/g,
  )) {
    JSON.parse(match[1]);
  }
}
const sitemap = await readFile(new URL("sitemap.xml", root), "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, paths.length);
await access(new URL("robots.txt", root));
await access(new URL("404.html", root));
await access(new URL("admin/vendor/decap-cms.js.LICENSE.txt", root));
console.log(
  `Verified ${paths.length} prerendered pages, metadata, linked assets, structured data, sitemap and 404.`,
);
