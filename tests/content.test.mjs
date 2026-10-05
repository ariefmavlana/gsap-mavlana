import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const site = JSON.parse(
  readFileSync(new URL("../content/site.json", import.meta.url)),
);
const { projects } = JSON.parse(
  readFileSync(new URL("../content/portfolio.json", import.meta.url)),
);
test("published projects have unique safe routes and useful accessible content", () => {
  assert.ok(projects.length > 0);
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(project.alt.length >= 10);
    assert.ok(project.description.length >= 30);
    assert.ok(
      ["Wedding", "Portrait", "Commercial", "Film"].includes(project.category),
    );
    assert.ok(project.gallery.length > 0);
    for (const src of [project.image, ...project.gallery])
      assert.match(
        src,
        /^(https:\/\/images\.unsplash\.com\/photo-[\w-]+|\/uploads\/[\w./-]+)$/,
      );
  }
});
test("contact destinations cannot be executable URLs or accidental fake addresses", () => {
  assert.match(site.whatsapp, /^(?:[1-9]\d{7,14})?$/);
  if (site.email) assert.match(site.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  for (const value of [site.instagram, site.reelUrl])
    if (value) assert.equal(new URL(value).protocol, "https:");
});
test("CMS maintains the content files consumed by the public site", () => {
  const config = readFileSync(
    new URL("../public/admin/config.yml", import.meta.url),
    "utf8",
  );
  assert.ok(config.includes("content/site.json"));
  assert.ok(config.includes("content/portfolio.json"));
  for (const key of Object.keys(site))
    assert.ok(config.includes(`name: ${key}`), `Missing CMS field: ${key}`);
});
